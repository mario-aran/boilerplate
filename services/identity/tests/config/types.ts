import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

export interface SetupGlobalThis {
  pgContainer?: StartedPostgreSqlContainer;
}
