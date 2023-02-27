#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod controller;
mod database;

use tauri::{utils::config::AppUrl, WindowUrl};

fn main() {
    let port = portpicker::pick_unused_port().expect("Failed to find unused port");

    let mut context = tauri::generate_context!();
    let url = format!("http://localhost:{}", port);
    let window_url = WindowUrl::External(url.parse().unwrap());

    context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());

    tauri::Builder::default()
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .invoke_handler(tauri::generate_handler![
            controller::server_controller::read_servers,
            controller::server_controller::add_server,
            controller::server_controller::update_server,
            controller::server_controller::delete_server,
        ])
        .run(context)
        .expect("error while running tauri application");
}
