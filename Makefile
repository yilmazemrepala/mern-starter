# MERN Stack Starter Kit - Makefile
# Simplifies Docker commands for development and production

.PHONY: help dev prod build clean logs restart status

# Default target
help:
	@echo "MERN Stack Starter Kit - Available Commands:"
	@echo ""
	@echo "Development:"
	@echo "  make dev        - Start development environment"
	@echo "  make dev-build  - Build and start development environment"
	@echo "  make dev-down   - Stop development environment"
	@echo ""
	@echo "Production:"
	@echo "  make prod       - Start production environment"
	@echo "  make prod-build - Build and start production environment"
	@echo "  make prod-down  - Stop production environment"
	@echo ""
	@echo "Utilities:"
	@echo "  make logs       - View all service logs"
	@echo "  make logs-f     - Follow all service logs"
	@echo "  make status     - Show service status"
	@echo "  make restart    - Restart all services"
	@echo "  make clean      - Clean up containers and volumes"
	@echo "  make clean-all  - Clean everything including images"

# Development commands
dev:
	@echo "Starting development environment..."
	docker-compose up -d
	@echo "Development environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:3001"

dev-down:
	@echo "Stopping development environment..."
	docker-compose down
	@echo "Development environment stopped!"

# Production commands
prod:
	@echo "Starting production environment..."
	docker-compose -f docker-compose.prod.yml up -d
	@echo "Production environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:3001"

prod-build:
	@echo "Building and starting production environment..."
	docker-compose -f docker-compose.prod.yml up --build -d
	@echo "Production environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:3001"

prod-down:
	@echo "Stopping production environment..."
	docker-compose -f docker-compose.prod.yml down
	@echo "Production environment stopped!"

# Utility commands
logs:
	@echo "Showing service logs..."
	docker-compose logs

logs-f:
	@echo "Following service logs... (Press Ctrl+C to stop)"
	docker-compose logs -f

status:
	@echo "Service status:"
	docker-compose ps

restart:
	@echo "Restarting all services..."
	docker-compose restart
	@echo "All services restarted!"

# Cleanup commands
clean:
	@echo "Cleaning up containers and volumes..."
	docker-compose down -v
	docker system prune -f
	@echo "Cleanup completed!"

clean-all:
	@echo "Cleaning everything including images..."
	docker-compose down -v --rmi all
	docker system prune -af
	@echo "Complete cleanup finished!"

# Individual service commands
frontend-logs:
	docker-compose logs frontend

backend-logs:
	docker-compose logs backend

mongodb-logs:
	docker-compose logs mongodb

frontend-restart:
	docker-compose restart frontend

backend-restart:
	docker-compose restart backend

mongodb-restart:
	docker-compose restart mongodb