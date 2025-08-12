#!/bin/bash

# Storybook CI Test Runner
# Builds, serves, tests, and cleans up Storybook with error handling
#
# This script replaces the verbose inline npm script with a maintainable,
# well-documented shell script that preserves all existing functionality.

set -e  # Exit immediately if any command fails

# Global variables
SERVER_PID_FILE=".storybook-server.pid"
SERVER_URL="http://localhost:8080"
IFRAME_URL="${SERVER_URL}/iframe.html"
TEST_EXIT_CODE=0

# =============================================================================
# Logging Functions
# =============================================================================

log_info() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] INFO: $1"
}

log_error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >&2
}

log_success() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] SUCCESS: $1"
}

# =============================================================================
# Core Functions
# =============================================================================

build_storybook() {
    log_info "Building Storybook static files..."
    if npm run build-storybook; then
        log_success "Storybook build completed"
    else
        log_error "Storybook build failed"
        exit 1
    fi
}

start_server() {
    log_info "Starting Storybook preview server in background..."

    # Start server in background and capture PID
    npm run preview-storybook &
    local server_pid=$!

    # Save PID to file for cleanup
    echo "$server_pid" > "$SERVER_PID_FILE"
    log_info "Server started with PID: $server_pid (saved to $SERVER_PID_FILE)"

    # Wait for server startup (including potential package installation)
    log_info "Waiting 30 seconds for server initialization (including potential serve package installation)..."
    sleep 30
}

health_check() {
    log_info "Performing server health check..."

    if curl -f -s "$IFRAME_URL" >/dev/null; then
        log_success "Server health check passed - $IFRAME_URL is responding"
    else
        log_error "Server health check failed - $IFRAME_URL is not responding"
        log_error "Server may not have started properly or is taking longer than expected"
        cleanup_server
        exit 1
    fi
}

run_tests() {
    log_info "Running Storybook tests..."

    # Run tests and capture exit code
    if npm run test-storybook-local; then
        TEST_EXIT_CODE=0
        log_success "All Storybook tests passed"
    else
        TEST_EXIT_CODE=$?
        log_error "Storybook tests failed with exit code: $TEST_EXIT_CODE"
    fi
}

cleanup_server() {
    log_info "Cleaning up server processes..."

    # Method 1: Kill using saved PID (most reliable)
    if [[ -f "$SERVER_PID_FILE" ]]; then
        local saved_pid
        saved_pid=$(cat "$SERVER_PID_FILE" 2>/dev/null || echo "")

        if [[ -n "$saved_pid" ]]; then
            if kill "$saved_pid" 2>/dev/null; then
                log_success "Successfully killed server process (PID: $saved_pid)"
            else
                log_info "PID $saved_pid not found or already terminated"
            fi
        fi
    fi

    # Method 2: Pattern-based kill as fallback
    if pkill -f "serve.*static/dist" 2>/dev/null; then
        log_info "Additional cleanup: killed serve processes via pattern matching"
    fi

    # Clean up PID file
    if rm -f "$SERVER_PID_FILE"; then
        log_info "Removed PID file: $SERVER_PID_FILE"
    fi

    log_info "Server cleanup completed"
}

# =============================================================================
# Error Handling & Cleanup
# =============================================================================

# Ensure cleanup runs on script exit (success, failure, or interruption)
trap cleanup_server EXIT

# Handle interruption signals gracefully
trap 'log_info "Received interrupt signal, cleaning up..."; exit 130' INT TERM

# =============================================================================
# Main Execution Flow
# =============================================================================

main() {
    log_info "Starting Storybook CI test pipeline..."
    log_info "=========================================="

    # Step 1: Build static Storybook files
    build_storybook

    # Step 2: Start preview server in background
    start_server

    # Step 3: Verify server is responding
    health_check

    # Step 4: Run the actual tests
    run_tests

    # Step 5: Cleanup happens automatically via trap

    log_info "=========================================="
    if [[ $TEST_EXIT_CODE -eq 0 ]]; then
        log_success "Storybook CI pipeline completed successfully"
    else
        log_error "Storybook CI pipeline failed (exit code: $TEST_EXIT_CODE)"
    fi

    # Exit with the test result code (not cleanup code)
    exit "$TEST_EXIT_CODE"
}

# =============================================================================
# Script Entry Point
# =============================================================================

# Validate we're in the right directory
if [[ ! -f "package.json" ]]; then
    log_error "package.json not found. Please run this script from the unified-theme directory."
    exit 1
fi

# Start the main pipeline
main "$@"
