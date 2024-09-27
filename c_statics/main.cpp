#include <hpdf.h>
#include <iostream>
#include <filesystem>
#include <stdexcept>
#include <string>

namespace fs = std::filesystem;

extern "C" __declspec(dllexport) void process(const fs::path folderPath)
{
    try
    {
        // Initialize PDF document
        HPDF_Doc pdf = HPDF_New(nullptr, nullptr);
        if (!pdf)
        {
            throw std::runtime_error("Failed to create PDF document");
        }

        for (const auto &entry : fs::directory_iterator(folderPath))
        {
            HPDF_Page page = HPDF_AddPage(pdf);
            HPDF_Page_SetSize(page, HPDF_PAGE_SIZE_A4, HPDF_PAGE_LANDSCAPE);
            HPDF_Image image = HPDF_LoadPngImageFromFile(pdf, entry.path().string().c_str());

            float imgWidth = HPDF_Image_GetWidth(image);
            float imgHeight = HPDF_Image_GetHeight(image);

            float pageWidth = HPDF_Page_GetWidth(page);
            float pageHeight = HPDF_Page_GetHeight(page);

            float heightRatio = imgHeight / pageHeight;
            float widthRatio = imgWidth / pageWidth;

            float scaledImgHeight, scaledImgWidth;

            if (heightRatio > widthRatio)
            {
                scaledImgHeight = pageHeight;
                scaledImgWidth = (imgWidth * scaledImgHeight) / imgHeight;
            }
            else
            {
                scaledImgWidth = pageWidth;
                scaledImgHeight = (imgHeight * scaledImgWidth) / imgWidth;
            }

            float x = (pageWidth - scaledImgWidth) / 2;
            float y = (pageHeight - scaledImgHeight) / 2;

            HPDF_Page_DrawImage(page, image, x, y, scaledImgWidth, scaledImgHeight);
        }

        // Save the PDF
        fs::path outputPath = folderPath.parent_path().parent_path().append("screens_output_data").append("output.pdf");
        fs::create_directory(outputPath.parent_path());
        
        HPDF_SaveToFile(pdf, outputPath.string().c_str());

        // Clean up
        HPDF_Free(pdf);

        std::cout << "PDF created successfully at: " << outputPath << std::endl;
    }
    catch (const std::exception &e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
    }
}

int main()
{
    std::cout << "Hello, World!" << std::endl;
    fs::path data_dir("C:\\Users\\nisaacdz\\AppData\\Local\\com.tauri.bloxel\\screens_image_data\\");
    process(data_dir);
    return 0;
}
