cmake_minimum_required(VERSION 3.10)

project(c_statics)

find_package(libharu CONFIG REQUIRED)

add_executable(c_statics main.cpp)

target_link_libraries(c_statics PRIVATE libharu::lobharu)
