use std::{ffi::CString, path::PathBuf, thread};

use image::Rgba;

pub fn save(cache_dir: PathBuf, width: u32, height: u32, background: [u8; 4]) -> PathBuf{
    let data_dir = cache_dir.join("data");
    let img_dir = cache_dir.join("image");
    generate_images(&data_dir, &img_dir, width, height, background);
    //call_pdf_generator(&img_dir);
    let pdf_dir = cache_dir.join("output");
    pdf_dir.join("output.pdf")
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


// pub fn call_pdf_generator(img_dir: &PathBuf) {
//     let img_dir_str = img_dir.to_str().unwrap();
//     let img_dir = CString::new(img_dir_str).expect("Failed to create the CString");
//     unsafe {
//         process(img_dir.as_ptr());
//     }
// }

// #[link(name = "c_statics")]
// extern "C" {
//     fn process(input_path: *const i8);
// }