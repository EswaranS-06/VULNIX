#!/bin/bash

# VULNIX (VNX) Start Script
# This script starts both the FastAPI backend and the Python http.server frontend.

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting VULNIX (VNX) System...${NC}"

# Function to kill background processes on exit
cleanup() {
    echo -e "\n${BLUE}🛑 Stopping servers...${NC}"
    # Kill all background jobs started by this script
    JOBS=$(jobs -p)
    if [ -n "$JOBS" ]; then
        kill $JOBS 2>/dev/null
    fi
    exit
}

# Trap Ctrl+C (SIGINT) and SIGTERM to ensure cleanup
trap cleanup SIGINT SIGTERM

# Check if port 8000 or 3000 are already in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}⚠️ Warning: Port $1 is already in use. Start might fail.${NC}"
    fi
}

check_port 8000
check_port 3000

# 1. Start Backend
echo -e "${GREEN}📡 Starting Backend (FastAPI)...${NC}"
cd backend || { echo "Error: backend directory not found"; exit 1; }

if [ -d ".venv" ]; then
    echo -e "${BLUE}Using existing virtual environment...${NC}"
    source .venv/bin/activate
    uvicorn app.main:app --reload --port 8000 &
elif command -v uv &> /dev/null; then
    echo -e "${BLUE}Using 'uv run' to start backend...${NC}"
    uv run uvicorn app.main:app --reload --port 8000 &
else
    echo -e "${YELLOW}Virtual environment not found, trying global python uvicorn...${NC}"
    python3 -m uvicorn app.main:app --reload --port 8000 &
fi
BACKEND_PID=$!
cd ..

# Give backend a moment to initialize
sleep 2

# 2. Start Frontend
echo -e "${GREEN}🎨 Starting Frontend (Static Server)...${NC}"
cd frontend || { echo "Error: frontend directory not found"; exit 1; }
python3 -m http.server 3000 &
FRONTEND_PID=$!
cd ..

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ VULNIX Services are initializing!${NC}"
echo -e "🔗 Backend API: ${BLUE}http://localhost:8000${NC}"
echo -e "🔗 API Docs:    ${BLUE}http://localhost:8000/docs${NC}"
echo -e "🔗 Frontend UI: ${BLUE}http://localhost:3000${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Note: Check logs above for any errors.${NC}"
echo -e "Press ${BLUE}Ctrl+C${NC} to stop both servers."

# Wait for background processes to keep the script running
wait
