use std::{ffi::{CStr, CString}, path::PathBuf, thread};

use image::Rgba;


#[link(name = "c_statics")]
extern "C" {
    fn process(input_path: *const i8, output_path: *const i8) -> *const i8; // Update with output path
}

pub fn save(cache_dir: PathBuf, width: u32, height: u32, background: [u8; 4]) {
    let data_dir = cache_dir.join("data");
    let img_dir = cache_dir.join("image");
    let output_dir = cache_dir.join("output");
    generate_images(&data_dir, &img_dir, width, height, background);
    call_pdf_generator(&img_dir, &output_dir);
}

pub fn generate_images(data_dir: &PathBuf, image_dir: &PathBuf,  width: u32, height: u32, background: [u8; 4]) {
    std::fs::create_dir_all(&image_dir).unwrap();
    thread::scope(|s| {
        for entry in std::fs::read_dir(data_dir).unwrap() {
            let child = entry.unwrap().path();
            s.spawn(move || {
                let buffer = std::fs::read(&child).unwrap();
                assert!(width * height * 4 == buffer.len() as u32);
                let mut img_buffer =
                    image::ImageBuffer::<Rgba<u8>, Vec<u8>>::from_raw(width, height, buffer)
                        .unwrap();
                for pixel in img_buffer.pixels_mut() {
                    let ratio = pixel[3] as u32;
                    pixel[0] = combine(pixel[0], background[0], ratio);
                    pixel[1] = combine(pixel[1], background[1], ratio);
                    pixel[2] = combine(pixel[2], background[2], ratio);
                    pixel[3] = 255;
                }

                let newname =
                    format! {"{}.png", child.file_name().unwrap_or_default().to_str().unwrap() };
                img_buffer
                    .save_with_format(image_dir.join(newname), image::ImageFormat::Png)
                    .unwrap();
            });
        }
    });
}

pub fn combine(channel1: u8, channel2: u8, ratio: u32) -> u8 {
    let res = (channel1 as u32 * ratio + channel2 as u32 * (255 - ratio)) / 255;
    res as _
}

pub fn call_pdf_generator(img_dir: &PathBuf, output_dir: &PathBuf) {
    // Convert Rust PathBuf to C string
    let input_path_c = CString::new(img_dir.to_string_lossy().as_bytes()).unwrap();
    let output_path_c = CString::new(output_dir.to_string_lossy().as_bytes()).unwrap();

    unsafe {
        // Call the C function
        let result = process(input_path_c.as_ptr(), output_path_c.as_ptr());

        // Convert the returned pointer to a Rust string
        if !result.is_null() {
            let c_str = CStr::from_ptr(result);
            let result_str = c_str.to_string_lossy();

            println!("C function returned: {}", result_str);
        } else {
            println!("C function returned a null pointer.");
        }
    }
}