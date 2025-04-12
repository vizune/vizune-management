# Vizune Management Studio – Backend API 💼

A full-stack-friendly backend API to help solo founders and creatives manage their company expenses, income, and financial records.

Built with modern TypeScript, PostgreSQL, Drizzle ORM, and schema validation via Zod — no monthly fees, no fuss, just clarity and control.

---

## 🚀 Features

- 💸 **Track expenses** – Log spending on courses, software, art, and more.
- 💰 **Log income** – Record sources like contributions, grants, and sales.
- ✅ **Schema validation with Zod** – Ensure clean, structured data.
- 🔄 **Type-safe PostgreSQL access** – Powered by Drizzle ORM.
- 🧠 **Shared Zod schemas** – Used across backend and frontend.
- 🗑️ **Delete entries** – Easily remove outdated or incorrect records.
- 🌐 **CORS-enabled** – Ready for frontend integration (localhost:3000 ⇄ 4000).
- 🦾 **Built in a pnpm monorepo** – Shared logic, cleaner architecture.

---

## 📦 Tech Stack

| Layer       | Tooling                                       |
|-------------|-----------------------------------------------|
| Language    | TypeScript                                    |
| Backend     | Node.js + Express                             |
| ORM         | [Drizzle ORM](https://orm.drizzle.team/)      |
| Database    | PostgreSQL (local via Docker)                 |
| Validation  | [Zod](https://zod.dev)                        |
| Structure   | pnpm workspaces + monorepo (`apps/` + `packages/`) |

---

## 🛠 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/SashaRichardson/vizune-management.git
cd vizune-management
```

### 2. Install dependencies (monorepo root)
```bash
pnpm install
```

### 3. Start PostgreSQL with Docker
```bash
docker run --name vizune-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=vizune \
  -p 5432:5432 \
  -d postgres
```

### 4. Apply the database schema
```bash
pnpm --filter backend drizzle-kit push
```

### 5. Run the backend server
```bash
pnpm --filter backend dev
```

Your server will be running on:
📡 `http://localhost:4000`


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
`Contribution`, `Grant`, `Sale`, `Donation`, `Other` 

---


## 🧠 Project Structure

```bash
vizune-management/
├─ apps/
│  ├─ backend/           # Express API with TypeScript + Drizzle
│  └─ frontend/          # (Coming soon) Next.js app
├─ packages/
│  └─ shared/            # Shared Zod schemas
└─ pnpm-workspace.yaml
```

## 🌙 Coming Soon

* Frontend with Next.js + shared Zod validation

* Expense charts & dashboards

* Export to CSV

* Authentication layer (optional)
