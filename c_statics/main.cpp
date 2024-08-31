#include <fstream>
#include <vector>
#include <stdexcept>
#include <filesystem>
#include "stb_image_write.h"
#include "hpdf.h"


// g++ main.cpp -I"./libs/libharu/include" -I"./libs/libharu/build/include" -L"./libs/libharu/build/src/Debug" -lhpdf -o main.exe
// g++ main.cpp -I"./libs/libharu/include" -I"./libs/libharu/build/include" -o main.exe
// g++ main.cpp -I"C:/Users/nisaacdz/desktop/workspace/bloxel/c_statics/libs/libharu/include" -I"C:/Users/nisaacdz/desktop/workspace/bloxel/c_statics/libs/libharu/build/include" -L"C:/Users/nisaacdz/desktop/workspace/bloxel/c_statics/libs/libharu/build/lib" -lhpdf -o main.exe

void process(const std::string &folderPath, int width, int height)
{
    // Initialize PDF document
    HPDF_Doc pdf = HPDF_New(NULL, NULL);
    if (!pdf)
    {
        throw std::runtime_error("Failed to create PDF object.");
    }

    // Open directory and list files
    std::vector<std::filesystem::path> fileNames;
    for (const auto &entry : std::filesystem::directory_iterator(folderPath))
    {
        if (entry.is_regular_file())
        {
            fileNames.push_back(entry.path());
        }
    }

    for (const auto &filePath : fileNames)
    {
        // Read the raw RGBA data
        std::ifstream file(filePath, std::ios::binary);
        if (!file)
        {
            throw std::runtime_error("Failed to open a file");
        }

        std::vector<unsigned char> buffer(width * height * 4); // 4 channels (RGBA)
        file.read(reinterpret_cast<char *>(buffer.data()), buffer.size());

        // Ensure the file was read correctly
        if (!file)
        {
            throw std::runtime_error("Failed to read a full image data.");
        }

        // Compress the image buffer to PNG format (in memory)
        std::vector<unsigned char> png_data;
        stbi_write_png_to_func(
            [](void *context, void *data, int size)
            {
                std::vector<unsigned char> *png_data = static_cast<std::vector<unsigned char> *>(context);
                png_data->insert(png_data->end(), static_cast<unsigned char *>(data), static_cast<unsigned char *>(data) + size);
            },
            &png_data, width, height, 4, buffer.data(), width * 4);

        // Create a new page in the PDF
        HPDF_Page page = HPDF_AddPage(pdf);
        HPDF_Page_SetSize(page, HPDF_PageSizes::HPDF_PAGE_SIZE_A4, HPDF_PageDirection::HPDF_PAGE_LANDSCAPE);

        float pageWidth = HPDF_Page_GetWidth(page);
        float pageHeight = HPDF_Page_GetHeight(page);

        // Calculate aspect ratio to maintain the image proportions
        float aspectRatio = static_cast<float>(width) / static_cast<float>(height);

        float scaledWidth, scaledHeight;

        if (pageWidth / width > pageHeight / height)
        {
            scaledWidth = pageWidth;
            scaledHeight = scaledWidth / aspectRatio;
        }
        else
        {
            scaledHeight = pageHeight;
            scaledWidth = scaledHeight * aspectRatio;
        }

        // Center the image on the page
        float xOffset = (pageWidth - scaledWidth) / 2;
        float yOffset = (pageHeight - scaledHeight) / 2;

        // Load the PNG data into the PDF as an image
        HPDF_Image image = HPDF_LoadPngImageFromMem(pdf, png_data.data(), png_data.size());
        if (!image)
        {
            throw std::runtime_error("Failed to load PNG image from memory.");
        }

        // Draw the image on the PDF page
        HPDF_Page_DrawImage(page, image, xOffset, yOffset, scaledWidth, scaledHeight);
    }

    // Save the PDF
    HPDF_SaveToFile(pdf, "output.pdf");

    // Clean up
    HPDF_Free(pdf);
}

int main()
{
    std::string folderPath = "C:\\Users\\nisaacdz\\AppData\\Local\\com.tauri.bloxel\\screens_cache_data";
    int width = 1366;
    int height = 768;
    process(folderPath, width, height);
    return 0;
}