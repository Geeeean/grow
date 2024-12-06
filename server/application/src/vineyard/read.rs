use diesel::{
    prelude::*,
    r2d2::{ConnectionManager, PooledConnection},
    result::Error,
};
use domain::models::Vineyard;

type Connection = PooledConnection<ConnectionManager<PgConnection>>;

pub fn read_vineyard(mut connection: Connection, vineyard_id: i32) -> Result<Vineyard, Error> {
    use domain::schema::vineyards::dsl::*;

    vineyards
        .find(vineyard_id)
        .first::<Vineyard>(&mut connection)
}

pub fn read_vineyards(mut connection: Connection) -> Result<Vec<Vineyard>, Error> {
    use domain::schema::vineyards::dsl::*;

    vineyards
        .select(Vineyard::as_select())
        .load::<Vineyard>(&mut connection)
}
