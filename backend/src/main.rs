use std::path::PathBuf;

fn main() {
    let data_dir = r"C:\Users\nisaacdz\AppData\Local\com.tauri.bloxel\screens_cache_data";
    let width = 1366;
    let height = 768;
    let background = [120, 120, 180];
    backend::generate_images(&PathBuf::from(data_dir), width, height, background);
}