use rusqlite::Connection;
use serde::Serialize;

#[derive(Serialize)]
pub struct ServerType {
    pub id: i32,
    pub connection: String,
    pub name: String,
}

pub fn create(db: &Connection, connection: String, name: String) -> Result<i64, String> {
    match db.execute(
        "INSERT INTO Server (connection, name) VALUES (?1, ?2)",
        &[&connection, &name],
    ) {
        Ok(_) => {
            let id = db.last_insert_rowid();
            return Ok(id);
        }
        Err(_) => return Err(String::from("Failed to save data")),
    }
}

pub fn read_all(db: &Connection) -> Result<Vec<ServerType>, String> {
    let mut server_vec: Vec<ServerType> = Vec::new();

    let mut sql_query = match db.prepare("SELECT * FROM Server") {
        Ok(query) => query,
        Err(_) => return Err(String::from("Failed to load servers")),
    };

    let server_iter = match sql_query.query_map([], |row| {
        Ok(ServerType {
            id: row.get(0)?,
            connection: row.get(1)?,
            name: row.get(2)?,
        })
    }) {
        Ok(server_iter) => server_iter,
        Err(_) => return Err(String::from("Failed to load databases")),
    };

    for server in server_iter {
        match server {
            Ok(server_data) => server_vec.push(server_data),
            Err(_) => continue,
        }
    }

    Ok(server_vec)
}

pub fn update(db: &Connection, id: i32, connection: String, name: String) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute(
        "UPDATE Server SET connection=(?1) name=(?2) WHERE id=(?3)",
        &[&connection, &name, &id],
    ) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to update server")),
    };
}

pub fn delete(db: &Connection, id: i32) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute("DELETE FROM Server WHERE id=(?1)", &[&id]) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to delete server")),
    };
}
