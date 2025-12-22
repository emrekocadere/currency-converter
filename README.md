# HotFixCurrency

<div align="center">

<img src="./frontend/currency-converter/src/images/logo.png" alt="Currency Converter Logo" width="150" />

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
- **Background Jobs** - Quartz.NET scheduled tasks (ready to enable)
- **Database Caching** - Store exchange rates locally
- **Dual Database Support** - SQL Server or PostgreSQL
- **Structured Logging** - Serilog for production debugging
- **API Documentation** - Built-in Swagger UI


## Quick Start

### Prerequisites
- Node.js 18+ and npm
- .NET 8.0 SDK
- SQL Server or PostgreSQL

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/emrekocadere/currency-converter.git
cd currency-converter
```

**2. Backend Setup**
```bash
cd backend/CurrencyConverter.API

# Update connection string in appsettings.json
# Run migrations
dotnet ef database update --project ../CurrencyConverter.DAL

# Start the API
dotnet run
```
API will be available at `http://localhost:5203`

**3. Frontend Setup**
```bash
cd frontend/currency-converter

# Install dependencies
npm install

# Start development server
npm start
```
Frontend will open at `http://localhost:3000`

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

## Configuration

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=CurrencyConverterDB;Trusted_Connection=True;"
  },
  "ApiSettings": {
    "ExchangeRateApiUrl": "https://api.exchangerate-api.com/v4/latest/",
    "MediaStackApiKey": "your-api-key"
  }
}
```

### Frontend
Update API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5203/api/CurrencyConverter';
```



## Performance Optimizations

- **React.memo** - Prevent unnecessary re-renders
- **useCallback/useMemo** - Optimize expensive calculations
- **Background Jobs** - Scheduled rate updates (configurable)
- **Database Indexing** - Fast query performance
- **Responsive Images** - SVG flags for minimal load time
- **Code Splitting** - Feature-based bundle splitting

---

## 👨‍💻 Created By

<div align="center">

**Salih Emre Kocadere**

Full-Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-emrekocadere-181717?style=for-the-badge&logo=github)](https://github.com/emrekocadere)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/salih-emre-kocadere-7a61b0203/)

---

### ⭐ Star this repo if you find it useful!

Made with ❤️ by Salih Emre Kocadere

![Profile Views](https://komarev.com/ghpvc/?username=emrekocadere&color=orange&style=flat-square&label=Profile+Views)

</div>

