// Types
type Version = 'v1' | 'v2' | 'v3';

// Utils
class RoutesBuilder<T extends Version> {
  private readonly ID_PATH = '/:id';
  private readonly baseApiRoute;
  private readonly baseApiDocsRoute;

  constructor(version: T) {
    this.baseApiRoute = `/api/${version}` as const;
    this.baseApiDocsRoute = `/api-docs/${version}` as const;
  }

  public getRoutes() {
    return {
      API: this.baseApiRoute,
      API_DOCS: this.baseApiDocsRoute,
      AUTH: this.buildAuthRoutes(),
      PERMISSIONS: this.buildPermissionsRoutes(),
      USER_ROLES: this.buildUserRolesRoutes(),
      USERS: this.buildUsersRoutes(),
    };
  }

  private buildBaseRoute<T extends string>(path: T) {
    return `${this.baseApiRoute}${path}` as const;
  }

  private buildAuthRoutes() {
    const base = this.buildBaseRoute('/auth');
    const loginPath = '/login';
    const logoutPath = '/logout';

    return {
      BASE: base,
      LOGIN: `${base}${loginPath}`,
      LOGOUT: `${base}${logoutPath}`,
      LOGIN_PATH: loginPath,
      LOGOUT_PATH: logoutPath,
    } as const;
  }

  private buildPermissionsRoutes() {
    const base = this.buildBaseRoute('/permissions');
    return { BASE: base } as const;
  }

  private buildUserRolesRoutes() {
    const base = this.buildBaseRoute('/user-roles');
    return { BASE: base } as const;
  }

  private buildUsersRoutes() {
    const base = this.buildBaseRoute('/users');
    const idPasswordPath = `${this.ID_PATH}/password` as const;

    return {
      BASE: base,
      ID: `${base}${this.ID_PATH}`,
      ID_PASSWORD: `${base}${idPasswordPath}`,
      ID_PATH: this.ID_PATH,
      ID_PASSWORD_PATH: idPasswordPath,
    } as const;
  }
}

// Constants
export const ROUTES_V1 = new RoutesBuilder('v1').getRoutes();
