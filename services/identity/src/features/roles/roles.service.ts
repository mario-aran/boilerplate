import { db } from '@/lib/drizzle/db';
import { rolesTable, rolesToPermissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  CreateRole,
  GetAllRoles,
  RoleId,
  UpdateRole,
} from '@/lib/zod/schemas/roles.schema';
import { HttpError } from '@/utils/http-error';
import { eq, ilike } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';

class RolesService {
  private roleNotFoundError = new HttpError({
    message: 'Role not found.',
    httpStatus: StatusCodes.NOT_FOUND,
  });

  public getAll = async ({ limit, page, sort, search = '' }: GetAllRoles) =>
    queryPaginatedData({
      schema: rolesTable,
      filters: ilike(rolesTable.id, `%${search}%`),
      limit,
      page,
      sort,
    });

  public get = async (id: RoleId['id']) => {
    const records = await db.query.rolesTable.findFirst({
      with: { rolesToPermissions: { columns: { permissionId: true } } },
      where: eq(rolesTable.id, id),
    });
    if (!records) throw this.roleNotFoundError;

    // Flatten results
    const { rolesToPermissions, ...restOfRecords } = records;
    const permissionIds = rolesToPermissions.map(
      ({ permissionId }) => permissionId,
    );
    return { ...restOfRecords, permissionIds };
  };

  public create = async (props: CreateRole) => {
    const [createdRecord] = await db
      .insert(rolesTable)
      .values(props)
      .returning();
    return createdRecord;
  };

  public update = async (
    id: RoleId['id'],
    { permissionIds, ...restOfProps }: UpdateRole,
  ) => {
    // Update roles
    if (Object.keys(restOfProps).length)
      await db.update(rolesTable).set(restOfProps).where(eq(rolesTable.id, id));

    // Update roles to permissions
    if (permissionIds) await this.updatePermissions(id, { permissionIds });

    // Get updated role with permissions
    return this.get(id);
  };

  public delete = async (id: RoleId['id']) => {
    const [deletedRecord] = await db
      .delete(rolesTable)
      .where(eq(rolesTable.id, id))
      .returning();
    if (!deletedRecord) throw this.roleNotFoundError;

    return deletedRecord;
  };

  private updatePermissions = async (
    id: RoleId['id'],
    { permissionIds }: Required<Pick<UpdateRole, 'permissionIds'>>,
  ) =>
    db.transaction(async (tx) => {
      // Delete all existing permissions for this role
      await tx
        .delete(rolesToPermissionsTable)
        .where(eq(rolesToPermissionsTable.roleId, id));
      if (!permissionIds.length) return [];

      // Add new permissions for this role
      const newPermissions = permissionIds.map((permissionId) => ({
        roleId: id,
        permissionId,
      }));
      return tx
        .insert(rolesToPermissionsTable)
        .values(newPermissions)
        .returning();
    });
}

export const rolesService = new RolesService();
