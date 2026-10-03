#!/usr/bin/env bash
set -e

echo "======================================================="
echo "   Compiling Nova C++ Engine and Microservice (Unix)   "
echo "======================================================="

echo "[1/2] Compiling Native Benchmark Engine (g++ -O3)..."
g++ -O3 -std=c++17 engine.cpp -o engine_benchmark
echo "[✓] engine_benchmark built successfully!"

echo "[2/2] Compiling C++ REST Server (g++ -O2)..."
g++ -O2 -std=c++17 server.cpp -o server
echo "[✓] server built successfully!"

echo ""
echo "======================================================="
echo "   Build complete! Run ./engine_benchmark or ./server   "
echo "======================================================="
