cmake_minimum_required(VERSION 3.15)
project(CStaticLibraryExample)

# Set the C++ standard
set(CMAKE_CXX_STANDARD 17)

# Enable static linking
set(BUILD_SHARED_LIBS OFF)

# Set vcpkg toolchain
set(CMAKE_TOOLCHAIN_FILE "C:/vcpkg/scripts/buildsystems/vcpkg.cmake")

# Add the library
add_library(c_statics STATIC main.cpp)

# Link the PoDoFo library
target_link_libraries(c_statics PRIVATE Podofo)

# Add the include directories for PoDoFo
target_include_directories(c_statics PRIVATE ${PODOFO_INCLUDE_DIRS})
