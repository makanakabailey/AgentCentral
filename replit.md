# Social Connect Central Dashboard

## Overview

This is a full-stack web application built as a central dashboard for managing multiple AI agents and a shared database. The application serves as a unified control center with a sophisticated dark theme design featuring monitoring capabilities, real-time metrics, and agent management functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with a custom dark theme system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Development**: Hot module replacement via Vite integration

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon Database serverless)
- **Schema Location**: `shared/schema.ts` - centralized schema definitions
- **Migrations**: Managed through `drizzle-kit` with migrations stored in `./migrations`

### Shared Schema
The application defines several core entities:
- **Agents**: AI agents with status tracking, activity monitoring, and task completion metrics
- **System Metrics**: CPU usage, memory usage, active tasks, and content generation statistics
- **Activities**: Real-time activity feed with type categorization and agent association
- **Database Stats**: Database table statistics including record counts and size tracking
- **Performance Metrics**: Engagement rates, content quality scores, and response times

### Frontend Components
- **Dashboard**: Main dashboard with real-time metrics and agent overview
- **Agent Cards**: Individual agent status and management interfaces
- **Activity Feed**: Real-time activity streaming with categorized notifications
- **Metrics Display**: System performance and database statistics visualization
- **Responsive Design**: Mobile-first approach with desktop enhancements

### Storage Architecture
- **Development**: In-memory storage implementation for rapid development
- **Production Ready**: Structured for easy PostgreSQL integration
- **Interface Pattern**: Abstract storage interface for easy testing and database switching

## Data Flow

1. **Client Requests**: Frontend makes API calls through centralized `api.ts` module
2. **Express Routes**: Backend routes handle requests and delegate to storage layer
3. **Storage Layer**: Abstract storage interface manages data persistence
4. **Real-time Updates**: TanStack Query handles automatic data refreshing and caching
5. **UI Updates**: React components re-render based on query state changes

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connectivity
- **ORM**: `drizzle-orm` and `drizzle-zod` for type-safe database operations
- **UI Framework**: Comprehensive Radix UI component suite
- **State Management**: `@tanstack/react-query` for server state
- **Validation**: Zod for runtime type validation
- **Styling**: Tailwind CSS with custom CSS variables

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Development**: Replit-specific plugins for enhanced development experience
- **Type Checking**: TypeScript with strict mode enabled
- **Hot Reload**: Vite development server with HMR

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` - Runs development server with hot reloading
- **Port**: Configured for Vite proxy with Express backend
- **Database**: Environment variable `DATABASE_URL` required for database connection

### Production Build
- **Frontend**: `vite build` - Static assets generated to `dist/public`
- **Backend**: `esbuild` compilation to `dist/index.js` with ESM format
- **Start Command**: `npm start` - Runs production server
- **Database Migration**: `npm run db:push` - Pushes schema changes to database

### Configuration Requirements
- **Environment Variables**: `DATABASE_URL` for database connectivity
- **Node Version**: ES modules support required
- **Database**: PostgreSQL compatible database (Neon Database recommended)

### Key Architectural Decisions

1. **Monorepo Structure**: Frontend (`client/`), backend (`server/`), and shared code (`shared/`) in single repository for easier development and deployment

2. **TypeScript Throughout**: Full TypeScript implementation for type safety across frontend, backend, and shared schemas

3. **Abstract Storage Pattern**: Storage interface allows for easy swapping between in-memory development storage and production database

4. **Component Library Approach**: shadcn/ui provides consistent, customizable components while maintaining design system coherence

5. **Real-time Data Strategy**: TanStack Query with configurable refresh intervals provides real-time feel without WebSocket complexity

6. **Dark Theme System**: CSS custom properties enable consistent theming across all components with sophisticated color palette management