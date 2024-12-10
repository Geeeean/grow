use diesel::pg::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool, PooledConnection};
use dotenvy::dotenv;
use std::env;

pub type DbPool = Pool<ConnectionManager<PgConnection>>;

pub fn establish_connection_pool() -> DbPool {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set.");
    let manager = ConnectionManager::<PgConnection>::new(database_url);

    Pool::builder()
        .build(manager)
        .expect("Failed to create pool.")
}

pub struct ServerState {
    pool: DbPool,
}

impl ServerState {
    pub fn new() -> Self {
        Self {
            pool: establish_connection_pool(),
        }
    }

    pub fn get_db_connection(&self) -> Result<PooledConnection<ConnectionManager<PgConnection>>, ()> {
        Ok(self.pool.get().map_err(|_| ())?)
    }
}
