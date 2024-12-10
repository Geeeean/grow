use diesel::{
    r2d2::{ConnectionManager, PooledConnection},
    PgConnection,
};

pub mod auth;
pub mod vineyard;

pub type Connection = PooledConnection<ConnectionManager<PgConnection>>;
