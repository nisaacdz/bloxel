// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{path::PathBuf, sync::OnceLock};

use tauri::{generate_handler, Manager};
fn main() {
    tauri::Builder::default()
        .setup(|app| {
            app.get_window("main").map(|window| {
                window.set_fullscreen(true).ok();
            });
            CACHE_DIR
                .set(app.path_resolver().app_cache_dir().unwrap())
                .ok();
            Ok(())
        })
        .invoke_handler(generate_handler![save_pdf, reset_cache])
        .run(tauri::generate_context!())
        .expect("error while running bloxel");
}

#[tauri::command]
fn save_pdf(width: u32, height: u32, background: [u8; 4]) {
    backend::save(CACHE_DIR.get().unwrap().clone(), width, height, background);
}

fn clear_dir(dir: &PathBuf) {
    let mut dir_contents = vec![];
    for en in std::fs::read_dir(dir).unwrap() {
        let de = en.unwrap();
        dir_contents.push(de.path());
    }

    for file_path in dir_contents {
        if file_path.is_dir() {
            std::fs::remove_dir_all(file_path).unwrap();
        } else {
            std::fs::remove_file(file_path).unwrap();
        }
    }
}

#[tauri::command]
fn reset_cache() -> String {
    let data_dir = data_dir();
    if data_dir.exists() {
        clear_dir(&data_dir);
    } else {
        std::fs::create_dir(&data_dir).unwrap();
    }
    data_dir.to_str().unwrap().to_owned()
}

static CACHE_DIR: OnceLock<PathBuf> = OnceLock::new();

fn data_dir() -> PathBuf {
    CACHE_DIR.get().unwrap().join("data")
}
