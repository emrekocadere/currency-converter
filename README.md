# Currvia

<div align="center">

<img src="./src/client/public/logo.png" alt="Currency Converter Logo" width="250" />

### Full-Stack Currency Exchange Platform

Currency converter with real-time exchange rates, historical data visualization, and financial news - built with React & .NET 8.0

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-5.26-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)


</div>

---

## Project Overview

Full-stack web application that provides real-time currency exchange rates, historical data analysis, and financial news aggregation. Built with Minimal APIs, React, and a layered architecture approach.

---

## Tech Stack

### Frontend
- React 
- Redux Toolkit
- Ant Design 
- MUI X-Charts 
- Axios 
- react-responsive 
- CSS3 

### Backend
- ASP.NET Core 
- Entity Framework Core 
- Refit
- Memory Cache 
- Quartz.NET 
- Serilog 
- Swagger 

### Database
- PostgreSQL

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



### Key Features
- **Real-time Conversion** - Live exchange rates from external API
- **Historical Conversion** - Convert using rates from any past date
- **Quick Swap** - One-click currency swap functionality
- **Multi-currency Support** - EUR, USD, GBP, AUD, CHF, CAD, JPY and more
- **SVG Flag Icons** - Beautiful country flags for visual identification
- **Financial News** - Global financial news feed with pagination from MediaStack API









