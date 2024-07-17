/* This file will contain functions to convert the saved canvas data to pdf.

If the board is used "page-wise", each page will be converted into a separate
pdf page.

If one or more pages is not "page-wise", it(they) will be sliced arbitrarily into "page-wise"
pieces before conversion into pdf.

*/


#include <hpdf.h>
#include <png.h>
#include <iostream>
#include <string>

#ifdef _WIN32
#define DLL_EXPORT __declspec(dllexport)
#else
#define DLL_EXPORT
#endif

extern "C" DLL_EXPORT const char* image_to_pdf(const char* image_path, const char* output_path);

void error_handler(HPDF_STATUS error_no, HPDF_STATUS detail_no, void *user_data) {
    std::cerr << "HPDF ERROR: error_no=" << error_no << ", detail_no=" << detail_no << std::endl;
    throw std::runtime_error("libharu error");
}

extern "C" DLL_EXPORT const char* image_to_pdf(const char* image_path, const char* output_path) {
    HPDF_Doc pdf = HPDF_New(error_handler, nullptr);
    if (!pdf) {
        return "Failed to create PDF object";
    }

    try {
        HPDF_Page page = HPDF_AddPage(pdf);
        HPDF_Image image = HPDF_LoadPngImageFromFile(pdf, image_path);
        if (!image) {
            HPDF_Free(pdf);
            return "Failed to load PNG image";
        }

        float imageWidth = HPDF_Image_GetWidth(image);
        float imageHeight = HPDF_Image_GetHeight(image);

        HPDF_Page_SetWidth(page, imageWidth);
        HPDF_Page_SetHeight(page, imageHeight);

        HPDF_Page_DrawImage(page, image, 0, 0, imageWidth, imageHeight);
        HPDF_SaveToFile(pdf, output_path);
    } catch (const std::exception &e) {
        HPDF_Free(pdf);
        return e.what();
    }

    HPDF_Free(pdf);
    return "PDF created successfully";
}
