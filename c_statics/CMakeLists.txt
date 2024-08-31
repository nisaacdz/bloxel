cmake_minimum_required(VERSION 3.10)
project(c_statics VERSION 0.1.0)

include(CTest)
enable_testing()

add_executable(c_statics src/main.cpp)
include_directories(${PROJECT_SOURCE_DIR}/include)
include_directories(${PROJECT_SOURCE_DIR}/libs/libharu/include)

target_link_libraries(c_statics ${PROJECT_SOURCE_DIR}/libs/libharu/build/src/Debug)


set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)