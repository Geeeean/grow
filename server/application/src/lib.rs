use diesel::{
    r2d2::{ConnectionManager, PooledConnection},
    PgConnection,
};

pub mod auth;
pub mod user;
pub mod vineyard;

pub type Connection = PooledConnection<ConnectionManager<PgConnection>>;
