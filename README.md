# Currvia

<div align="center">

<img src="./src/client/public/logo.png" alt="Currency Converter Logo" width="250" />

### Full-Stack Currency Exchange Platform

Currency converter with real-time exchange rates, historical data visualization, and financial news - built with React & .NET 8.0

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-5.26-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)

[Quick Start](#quick-start) • [Tech Stack](#tech-stack) • [Features](#key-features)

</div>

---

## Project Overview

Full-stack web application that provides real-time currency exchange rates, historical data analysis, and financial news aggregation. Built with a **layered architecture** approach using React and .NET 8.0.

> **Portfolio Project** - Full-stack development with React, .NET, and SQL Server.

---

## Tech Stack

### Frontend
- React 
- Ant Design 
- MUI X-Charts 
- Axios 
- Framer Motion 
- react-responsive 
- CSS3 

### Backend
- ASP.NET Core 
- Entity Framework Core 
- Memory Cache 
- Quartz.NET 
- Serilog 
- Swagger 

### Database
- SQL Server / PostgreSQL

---

### Key Features

- Currency Conversion
    - Real-time exchange rates
    - Historical date-based conversion
    - Quick swap functionality
    - Support for multiple global currencies

- Data Visualization
    - 3-month historical trends
    - Interactive line charts (MUI X-Charts)
    - Visual rate comparisons

- Financial News
    - Global news feed
    - Paginated results
    - Titles, descriptions and source links

- UI/UX
    - Dark theme
    - Responsive design
    - Smooth animations and transitions

---

## Architecture & Design

### Architecture Patterns

**Backend (3-Tier Layered Architecture):**
```
Presentation Layer (API Controllers)
    ↓
Business Logic Layer (Services, DTOs, Jobs)
    ↓
Data Access Layer (Repositories, EF Core)
```

**Frontend (Feature-Based Structure):**
```
features/        → Self-contained feature modules
shared/          → Reusable components, hooks, layouts
services/        → Centralized API client (Axios)
utils/           → Helper functions and formatters
```

### Code Quality & Best Practices

**Backend:**
- Layered Architecture - Clear separation of concerns (API → BLL → DAL)
- Repository Pattern - Clean data access abstraction
- Dependency Injection - Built-in .NET DI container for loose coupling
- DTOs (Data Transfer Objects) - Separate data models for API responses
- Async/Await - Asynchronous programming for better performance

**Frontend:**
- Feature-Based Structure - Modular organization by features
- Custom Hooks - Reusable logic (useConverter, useRates, useResponsive)
- PropTypes Validation - Runtime type checking for components
- Direct Imports - No barrel exports for better tree-shaking
- Component Composition - Reusable UI components

---


### Key Features
- **Real-time Conversion** - Live exchange rates from external API
- **Historical Conversion** - Convert using rates from any past date
- **Quick Swap** - One-click currency swap functionality
- **Multi-currency Support** - EUR, USD, GBP, AUD, CHF, CAD, JPY and more
- **SVG Flag Icons** - Beautiful country flags for visual identification

### Data Visualization
- **3-Month Historical Charts** - Interactive line charts with MUI X-Charts
- **Trend Analysis** - Visual representation of currency movements
- **Responsive Charts** - Adapts to all screen sizes
- **Real-time Updates** - Charts update with latest data

### Financial News
- **Global News Feed** - Latest financial news from MediaStack API
- **Pagination** - Load more news seamlessly
- **Rich Content** - Titles, descriptions, and source links
- **Curated Updates** - Financial market insights

### User Experience
- **Dark Theme** - Modern, eye-friendly interface
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Welcome Modal** - First-time user introduction
- **Smooth Animations** - Subtle transitions and hover effects
- **Accessibility** - WCAG compliant design patterns

### Backend Capabilities
- **Memory Caching** - In-memory cache for API responses with TTL
- **Background Jobs** - Quartz.NET scheduled tasks for rate updates
- **Database Persistence** - Store historical exchange rates
- **Dual Database Support** - SQL Server or PostgreSQL
- **Structured Logging** - Serilog for debugging and monitoring
- **API Documentation** - Interactive Swagger UI



---

## API Endpoints

Base URL: `http://localhost:5203/api/CurrencyConverter`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/exchange` | Convert currency with current rates |
| GET | `/exchange/by-date` | Convert currency for a specific date |
| GET | `/currencies` | Get all available currencies |
| GET | `/currency-rates` | Get common currency rates |
| GET | `/currency-rates/history` | Get 3-month historical data |
| GET | `/news` | Get paginated financial news |

---



## Performance Optimizations

- **Memory Cache** - Reduced external API calls with in-memory caching
- **React.memo** - Prevent unnecessary re-renders
- **useCallback/useMemo** - Optimize expensive calculations
- **Background Jobs** - Scheduled rate updates with Quartz.NET
- **Database Indexing** - Fast query performance
- **Responsive Images** - SVG flags for minimal load time

---

## Created By

<div align="center">

**Salih Emre Kocadere**

Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/salih-emre-kocadere-7a61b0203/)


</div>

