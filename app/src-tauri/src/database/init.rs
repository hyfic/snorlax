use rusqlite::{Connection, Result};

pub fn connect_database() -> Result<Connection> {
    let conn = Connection::open("app.db")?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Server(
          id integer primary key,
          connection text,
          name text
        )",
        [],
    )?;

    Ok(conn)
}
