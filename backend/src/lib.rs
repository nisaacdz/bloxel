use std::path::PathBuf;

pub fn save(data_dir: &str) -> std::io::Result<PathBuf> {
    let result = "".to_owned(); // returned from cpp dll called with the data_dir argument
    Ok(result.into())
}


extern "C" {
    fn process(folder_path: *const u8, width: u32, height: u32) -> i32;
}
