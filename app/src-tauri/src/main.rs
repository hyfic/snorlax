#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod controller;
mod database;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            controller::server_controller::read_servers,
            controller::server_controller::add_server,
            controller::server_controller::update_server,
            controller::server_controller::delete_server,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
