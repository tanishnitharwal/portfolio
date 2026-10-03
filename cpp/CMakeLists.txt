cmake_minimum_required(VERSION 3.14)
project(NovaCppEngine VERSION 2.4.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if(MSVC)
    add_compile_options(/O2 /W4 /fp:fast)
else()
    add_compile_options(-O3 -Wall -Wextra -march=native -ffast-math)
endif()

# 1. Standalone Benchmark Executable
add_executable(engine_benchmark engine.cpp)

# 2. REST API Microservice
add_executable(nova_server server.cpp)
if(WIN32)
    target_link_libraries(nova_server PRIVATE ws2_32)
endif()
