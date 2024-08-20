// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
fn main() {
    tauri::Builder::default()
        .setup(|app| {
            app.get_window("main").map(|window| {
                window.set_fullscreen(true).ok();
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running bloxel");
}