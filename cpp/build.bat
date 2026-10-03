@echo off
echo =======================================================
echo    Compiling Nova C++ Engine and Microservice (Windows)
echo =======================================================

echo [1/2] Compiling Native Benchmark Engine (g++ -O3)...
g++ -O3 -std=c++14 engine.cpp -o engine_benchmark.exe
if %ERRORLEVEL% EQU 0 (
    echo [✓] engine_benchmark.exe built successfully!
) else (
    echo [X] Failed to build engine_benchmark.exe
)

echo.
echo [2/2] Compiling C++ REST Server (g++ -O2 -lws2_32)...
g++ -O2 server.cpp -o server.exe -lws2_32
if %ERRORLEVEL% EQU 0 (
    echo [✓] server.exe built successfully!
) else (
    echo [X] Failed to build server.exe
)

echo.
echo =======================================================
echo    Build complete! 
echo    Run '.\engine_benchmark.exe' for native performance test.
echo    Run '.\server.exe' to launch local C++ API server.
echo =======================================================
pause
