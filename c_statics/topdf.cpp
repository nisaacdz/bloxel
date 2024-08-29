#include <fstream>
#include <vector>
#include "hpdf.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"


void process(const std::string& folderPath, int width, int height) {
    // Initialize PDF document
    HPDF_Doc pdf = HPDF_New(NULL, NULL);
    if (!pdf) {
        throw std::runtime_error("Failed to create PDF object.");
    }

    // Open directory (you need to implement the file listing yourself or use platform-specific APIs)
    std::vector<std::string> fileNames = {/* List of files in folderPath */};

    for (const auto& fileName : fileNames) {
        // Full path to the file
        std::string filePath = folderPath + "/" + fileName;

        // Read the raw RGBA data
        std::ifstream file(filePath, std::ios::binary);
        if (!file) {
            throw std::runtime_error("Failed to open file: " + filePath);
        }

        std::vector<unsigned char> buffer(width * height * 4); // 4 channels (RGBA)
        file.read(reinterpret_cast<char*>(buffer.data()), buffer.size());

        // Ensure the file was read correctly
        if (!file) {
            throw std::runtime_error("Failed to read the full image data from: " + filePath);
        }

        // Compress the image buffer to a PNG format (in memory)
        std::vector<unsigned char> png_data;
        stbi_write_png_to_func(
            [](void* context, void* data, int size) {
                std::vector<unsigned char>* png_data = static_cast<std::vector<unsigned char>*>(context);
                png_data->insert(png_data->end(), static_cast<unsigned char*>(data), static_cast<unsigned char*>(data) + size);
            },
            &png_data, width, height, 4, buffer.data(), width * 4
        );

        // Create a new page in the PDF
        HPDF_Page page = HPDF_AddPage(pdf);
        HPDF_Page_SetWidth(page, width);
        HPDF_Page_SetHeight(page, height);

        // Load the PNG data into the PDF as an image
        HPDF_Image image = HPDF_LoadPngImageFromMem(pdf, png_data.data(), png_data.size());

        // Draw the image on the PDF page, centered
        HPDF_Page_DrawImage(page, image, 0, 0, width, height);
    }

    // Save the PDF
    HPDF_SaveToFile(pdf, "output.pdf");

    // Clean up
    HPDF_Free(pdf);
}
