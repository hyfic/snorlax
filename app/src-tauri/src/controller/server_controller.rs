// controllers for frontend to invoke backend

use crate::database::init_database;
use crate::database::server_model;

#[tauri::command]
pub fn read_servers() -> Result<Vec<server_model::ServerType>, String> {
    let db = init_database()?;
    server_model::read_all(&db)
}

#[tauri::command]
pub fn add_server(path: String, name: String) -> Result<i64, String> {
    let db = init_database()?;
    server_model::create(&db, path, name)
}

#[tauri::command]
pub fn update_server(id: i32, connection: String, name: String) -> Result<(), String> {
    let db = init_database()?;
    server_model::update(&db, id, connection, name)
}

#[tauri::command]
pub fn delete_server(id: i32) -> Result<(), String> {
    let db = init_database()?;
    server_model::delete(&db, id)
}
