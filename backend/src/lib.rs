use image::Rgb;

pub struct RawImage {
    data: Box<[u8]>,
    width: u32,
    height: u32,
}

impl RawImage {
    pub fn new(data: Box<[u8]>, width: u32, height: u32) -> Self {
        assert_eq!(data.len() as u32, width * height * 3);
        Self {
            data,
            width,
            height,
        }
    }

    pub fn compress(mut self) {
        let mut img = image::ImageBuffer::<Rgb<u8>, Box<[u8]>>::from_raw(self.width, self.height, self.data).unwrap();
        
    }
}
