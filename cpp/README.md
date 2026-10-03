# Nova C++ Engine & WebAssembly Architecture

This directory houses the native C++ source files, build systems, and microservices integrated with the portfolio web application.

---

## 🚀 Architecture Overview

The C++ module delivers ultra-low latency compute capabilities to both the web browser (via WebAssembly) and standalone native environments (via HTTP REST Microservice).

```
┌──────────────────────────────────────────────────────────┐
│                   Browser Client (Frontend)              │
│   (HTML5 / CSS3 / ES6+ / Canvas API / WebAssembly API)   │
└───────────────▲──────────────────────────▲───────────────┘
                │                          │
        (Direct Shared Memory)      (HTTP REST / JSON)
                │                          │
┌───────────────▼───────────┐  ┌───────────▼───────────────┐
│     WebAssembly (WASM)    │  │     C++ REST Server       │
│  - Mandelbrot & Julia Set │  │  - Winsock / POSIX Socket │
│  - N-Body Particle Physics│  │  - Live System Telemetry  │
│  - Cache-Blocked Matrix   │  │  - Real-Time Benchmarks   │
│  - Bitset Prime Sieve     │  │  - Contact API Handler    │
└───────────────────────────┘  └───────────────────────────┘
```

---

## 📁 File Structure

- **`engine.cpp`**: Core computation kernels (Mandelbrot fractal renderer, 2D N-body particle physics simulation, cache-blocked matrix multiplication, and Sieve of Eratosthenes). Provides both `extern "C"` WebAssembly bindings and native CLI benchmarking.
- **`server.cpp`**: Cross-platform lightweight C++ HTTP server (supporting Windows Winsock2 & POSIX Linux sockets) providing REST API endpoints on `http://localhost:8081`.
- **`Makefile`**: Multi-target Makefile for native g++ and Emscripten builds.
- **`CMakeLists.txt`**: Standard CMake configuration for cross-platform modern C++ compilation.
- **`build.bat` / `build.sh`**: One-click build automation scripts.

---

## 🛠️ Compilation & Running

### 1. Build and Run Native C++ Benchmark
```bash
# Windows (g++ MinGW or MSVC)
g++ -O3 -std=c++14 engine.cpp -o engine_benchmark.exe
.\engine_benchmark.exe

# Linux / macOS
g++ -O3 -std=c++17 engine.cpp -o engine_benchmark
./engine_benchmark
```

### 2. Build and Run C++ REST Microservice Server
```bash
# Windows
g++ -O2 server.cpp -o server.exe -lws2_32
.\server.exe

# Linux / macOS
g++ -O2 -std=c++17 server.cpp -o server
./server
```

Once running, the microservice responds on port `8081`:
- `GET http://localhost:8081/api/status` : Server telemetry & memory stats
- `GET http://localhost:8081/api/benchmark` : Real-time compute benchmark results
- `POST http://localhost:8081/api/contact` : Contact verification endpoint

### 3. Compile to WebAssembly (Emscripten)
```bash
emcc -O3 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s NO_EXIT_RUNTIME=1 \
  -s "EXPORTED_FUNCTIONS=['_allocate_image_buffer','_get_image_buffer_ptr','_compute_mandelbrot_frame','_init_particles','_get_particles_ptr','_update_particles','_benchmark_matrix_multiply','_benchmark_prime_sieve','_get_engine_info']" \
  -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" \
  engine.cpp -o ../wasm/engine.wasm
```

---

## ⚡ WebAssembly Integration in JavaScript

The frontend bridges directly to the C++ WebAssembly heap:
1. `allocate_image_buffer(width, height)` allocates direct 32-bit RGBA pixel memory.
2. `compute_mandelbrot_frame(...)` executes the math in native WASM instructions.
3. JavaScript copies the shared memory buffer directly into an `ImageData` buffer for zero-overhead 60 FPS HTML5 Canvas rendering.
