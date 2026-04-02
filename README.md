# Finance Dashboard

A production-grade React + Vite dashboard built to track financial data, visualize expenditures, and manage transactions seamlessly.

## 🚀 Features

* **Dashboard Overview:** Dynamic tracking module generating real-time calculations of Total Income, Total Expenses, and Rolling Balances.
* **Analytics Visualizations:** Interactive, responsive Data Charts leveraging `recharts` to render categorized spending distributions (Pie Patterns) alongside overall balance progression lines (Line Trends). 
* **Role-Based UI:** Secure simulation utilizing global `Context API` separating state behaviors effectively between 'Admin' (capable of creating and deleting entries) and 'Viewer' perspectives (read-only UI configuration).
* **Robust Transaction Board:** Interactive data-table implementing real-time querying, filtered search conditions, and conditional formatting bounds mapped securely to raw context logic.
* **Auto-Calculated Insights:** Mathematical utilities deriving organic insights against localized payloads, presenting data-driven recommendations regarding categoric expenses.

## 🛠️ Technology Stack

* **Frontend Engine:** React 18
* **Bundler:** Vite
* **Styling Ecosystem:** Tailwind CSS
* **State Management:** React Context API natively deployed ensuring highly transparent component hydration
* **Data Visualizations:** Recharts (responsive dimensional containers)

## 📦 Setup Instructions

1. **Clone the repository:**
   `git clone ...`
2. **Move inside application boundary:**
   `cd finance-dashboard`
3. **Install dependencies natively via NPM:**
   `npm install`
4. **Deploy Development Server:**
   `npm run dev`

The application builds cleanly alongside automated code rules linting via `npm run lint`.

## 🏗️ Architecture Approach

The architecture adopts a strict **"Feature-Based"** modular hierarchy enforcing high decoupling between routing infrastructure, contextual data layers, and the UI layout modules. Complex data interactions strictly deploy internal functions through shared generic utilities (`/utils` & `/filters`), isolating domain logic from pure render views.
"# finance_dashboard" 
