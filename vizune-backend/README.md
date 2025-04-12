# Vizune Management Studio – Backend API 💼

A lightweight backend API to help solo founders and creators manage their company expenses, income, and financial records. Built with Node.js, Express, and SQLite — no monthly fees, no fuss.

## 🚀 Features

- 💸 **Track expenses** – Log business-related spending like courses, software, art commissions, etc.
- 💰 **Log income** – Record funding sources like personal contributions, grants, and sales.
- ✅ **Type/category validation** – Keep your data clean using predefined types.
- 🗑️ **Delete entries** – Easily remove any incorrect or outdated records.
- 📦 **Data persistence** – All data is stored in a local SQLite database.
- 🧠 **Simple API** – Designed for quick local use or future frontend integration.

---

## 📦 Tech Stack

- **Node.js + Express** – REST API framework
- **SQLite** via `better-sqlite3` – Simple, fast, file-based database
- **Postman** (or similar) – For testing endpoints

---

## 🛠 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/vizune-management-studio.git
cd vizune-management-studio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
npm run dev
```
The server will start on http://localhost:4000


## 📬 API Endpoints

### 🔹 Expenses

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | `/expenses`        | Add a new expense        |
| GET    | `/expenses`        | List all expenses        |
| GET    | `/expenses/types`  | Get valid categories     |
| DELETE | `/expenses/:id`    | Delete an expense        |

#### Sample Expense Request

```json
{
  "date": "2025-04-11",
  "amount": 120.50,
  "vendor": "Udemy",
  "category": "Education",
  "notes": "Game design course"
}
```

**Valid categories**:  
`Education`, `Design`, `Artwork`, `Software`, `Other`

---

### 🔹 Income

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/income`        | Log income or funding    |
| GET    | `/income`        | List all income entries  |
| GET    | `/income/types`  | Get valid income types   |
| DELETE | `/income/:id`    | Delete an income entry   |

#### Sample Income Request

```json
{
  "date": "2025-04-11",
  "amount": 1000,
  "source": "Personal Savings",
  "type": "Contribution",
  "notes": "Initial company funding"
}
```

**Valid types**:  
`Contribution`, `Grant`, `Grant`, `Donation`, `Other` 

---

⚠️ Note: The SQLite database file (`vizune.db`) is ignored by Git. If cloning this repo, you'll need to run the server once to auto-generate the database.