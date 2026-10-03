# ==============================================================================
# NOVA C++ ENGINE - MAKEFILE (Native & WebAssembly Builds)
# ==============================================================================

CXX = g++
CXXFLAGS = -O3 -std=c++14 -Wall -Wextra
EMCC = emcc
EMCC_FLAGS = -O3 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s NO_EXIT_RUNTIME=1 -s "EXPORTED_FUNCTIONS=['_allocate_image_buffer','_get_image_buffer_ptr','_compute_mandelbrot_frame','_init_particles','_get_particles_ptr','_update_particles','_benchmark_matrix_multiply','_benchmark_prime_sieve','_get_engine_info']" -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']"

# Target binaries
BENCHMARK_BIN = engine_benchmark.exe
SERVER_BIN = server.exe
WASM_OUT = ../wasm/engine.wasm

all: benchmark server

benchmark: engine.cpp
	@echo [BUILD] Compiling Native C++ Benchmark Engine...
	$(CXX) $(CXXFLAGS) engine.cpp -o $(BENCHMARK_BIN)

server: server.cpp
	@echo [BUILD] Compiling Native C++ REST Microservice Server...
	$(CXX) -O2 server.cpp -o $(SERVER_BIN) -lws2_32

wasm: engine.cpp
	@echo [BUILD] Compiling C++ to WebAssembly (WASM)...
	$(EMCC) $(EMCC_FLAGS) engine.cpp -o $(WASM_OUT)

clean:
	@echo [CLEAN] Removing compiled binaries...
	del $(BENCHMARK_BIN) $(SERVER_BIN) 2>nul || rm -f $(BENCHMARK_BIN) $(SERVER_BIN)

.PHONY: all benchmark server wasm clean
