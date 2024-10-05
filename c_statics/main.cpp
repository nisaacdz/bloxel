#include <podofo/podofo.h>
#include <iostream>
#include <filesystem>
#include <stdexcept>
#include <string>

namespace fs = std::filesystem;

extern "C" const char* process(const char* imagesFolder, const char* outputFolder)
{
    try
    {
        PoDoFo::PdfMemDocument pdfDocument;

        for (const auto& entry : fs::directory_iterator(imagesFolder))
        {
            if (entry.is_regular_file() && entry.path().extension() == ".png") // Only process PNG images
            {
                PoDoFo::PdfPage* page = pdfDocument.CreatePage(PoDoFo::PdfPage::CreatePageSize(PoDoFo::ePdfPageSize_A4));
                pdfDocument.PushPage(page);

                // Load the image
                PoDoFo::PdfImage image;
                image.LoadFromFile(entry.path().string().c_str());

                // Draw the image onto the page
                // You'll need to define the width and height based on your requirements
                float x = 50; // X position
                float y = 50; // Y position
                float width = 500; // Width to draw the image
                float height = 500; // Height to draw the image
                page->DrawImage(image, x, y, width, height);
            }
        }

        fs::path outputFilePath = fs::path(outputFolder) / "output.pdf";
        fs::create_directories(outputFolder); // Ensure the output folder exists
        pdfDocument.Write(outputFilePath.string().c_str());

        std::cout << "PDF created successfully at: " << outputFilePath << std::endl;
        return "ok"; // Success
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
        return e.what(); // Return the error message
    }
}
