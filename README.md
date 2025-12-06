# Currency Converter

<div align="center">

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
- React 18.3.1
- Ant Design 5.26.1
- MUI X-Charts 7.27.0
- Axios 1.7.7
- Styled Components 6.1.15
- Framer Motion 11.11.11
- react-responsive 10.0.0
- CSS3 (custom styles)

### Backend
- ASP.NET Core 8.0
- Entity Framework Core 8.0.15
- Quartz.NET 3.14.0
- Serilog 8.0.0
- Swagger 6.4.0

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

### Layered Architecture (3-Tier)

```
┌─────────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER (UI)                    │
│  ┌────────────────────────┐  ┌──────────────────────────┐  │
│  │   React Frontend       │  │  ASP.NET Core Web API    │  │
│  │   (Feature-Based)      │  │  (Controllers)           │  │
│  │   - Components         │  │  - HTTP Endpoints        │  │
│  │   - Pages              │  │  - Request/Response      │  │
│  └────────────────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│              BUSINESS LOGIC LAYER (BLL)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  CurrencyConverterService                              │ │
│  │  - Currency conversion logic                           │ │
│  │  - Rate calculations & validations                     │ │
│  │  - DTOs (Data Transfer Objects)                        │ │
│  │  - Background jobs (Quartz.NET)                        │ │
│  │  - Custom response types                               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│               DATA ACCESS LAYER (DAL)                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Entity Framework Core + Repositories                  │ │
│  │  - Repository Pattern                                  │ │
│  │  - DbContext & Entity Models                           │ │
│  │  - Database Migrations                                 │ │
│  │  - SQL Server / PostgreSQL Support                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Architecture Benefits:**
- Separation of Concerns - Each layer has a specific responsibility
- Loose Coupling - Layers communicate through interfaces
- Maintainability - Easy to update individual layers
- Testability - Each layer can be tested independently
- Scalability - Easy to scale specific layers as needed

### Project Structure

#### Backend (.NET 8.0)
```
backend/
├── CurrencyConverter.API/          # Presentation Layer
│   ├── Controllers/                # REST API endpoints
│   │   └── CurrencyConverterController.cs
│   ├── Program.cs                  # Application entry point
│   └── appsettings.json           # Configuration
│
├── CurrencyConverter.BLL/          # Business Logic Layer
│   ├── CurrencyConverterService.cs # Core business logic
│   ├── Jobs/                       # Background jobs (Quartz)
│   │   ├── CurrencyRatesFetcherJob.cs
│   │   └── MediaStackNewsFetcherJob.cs
│   ├── Dtos/                       # Data Transfer Objects
│   └── Results/                    # Custom response types
│
└── CurrencyConverter.DAL/          # Data Access Layer
    ├── CurrencyConverterDbContext.cs
    ├── Entities/                   # Database models
    │   ├── Currency.cs
    │   ├── CurrencyRatio.cs
    │   └── News.cs
    ├── Repositories/               # Repository pattern
    └── Migrations/                 # EF Core migrations
```

#### Frontend (React 18.3.1)
```
frontend/currency-converter/
├── src/
│   ├── features/                   # Feature-based modules
│   │   ├── converter/             # Currency conversion
│   │   │   ├── CurrencyConverter.jsx
│   │   │   └── useConverter.js    # Custom hook
│   │   ├── chart/                 # Historical data visualization
│   │   │   └── CurrencyChart.js
│   │   ├── rates/                 # Exchange rates display
│   │   │   ├── CommonCurrenciesRates.jsx
│   │   │   └── useRates.js
│   │   └── welcome/               # Welcome modal
│   │
│   ├── shared/                    # Shared resources
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── ConversionResult.jsx
│   │   │   ├── CurrencyFlag.js
│   │   │   └── RateItem.js
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── MainLayout.js
│   │   └── hooks/                 # Custom hooks
│   │       └── useResponsive.js
│   │
│   ├── services/                  # API integration
│   │   └── api.js                 # Centralized Axios calls
│   ├── utils/                     # Utility functions
│   ├── pages/                     # Page components
│   └── Images/                    # Static assets (SVG flags)
│
└── package.json                   # Dependencies & scripts
```

---


### Tools

| Tool | Purpose |
|------|---------|
| Visual Studio / VS Code | Primary IDE |
| npm | Frontend dependency management |
| NuGet | Backend package management |
| Git | Version control |
| Postman | API testing |
| Swagger UI | Interactive API documentation |

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
- **Background Jobs** - Quartz.NET scheduled tasks (ready to enable)
- **Database Caching** - Store exchange rates locally
- **Dual Database Support** - SQL Server or PostgreSQL
- **Structured Logging** - Serilog for production debugging
- **API Documentation** - Built-in Swagger UI

## Technical Highlights

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


## Screenshots

> Screenshots will be added soon. The application features:
> - Clean currency conversion interface with flag icons
> - Interactive 3-month historical charts
> - Paginated financial news feed
> - Dark theme design

</div>

---

## 👨‍💻 Created By



**Salih Emre Kocadere**

[![GitHub](https://img.shields.io/badge/GitHub-emrekocadere-181717?style=for-the-badge&logo=github)](https://github.com/emrekocadere)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/your-profile)

</div>


### Star this repo if you find it useful!

Made by Salih Emre Kocadere

![Profile Views](https://komarev.com/ghpvc/?username=emrekocadere&color=orange&style=flat-square&label=Profile+Views)

[Back to Top](#currency-converter)

