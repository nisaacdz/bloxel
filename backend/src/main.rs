use backend::save;

fn main() {
    let cache_dir = r"C:\Users\nisaacdz\AppData\Local\com.tauri.bloxel";
    let width = 1366;
    let height = 768;
    let background = [180, 120, 150, 255];
    save(cache_dir.into(), width, height, background);
}
