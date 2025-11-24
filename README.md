# E-commerce Platform Backend API

## 🚀 Overview

This is the secure and scalable backend API for a modern e-commerce application. It is built on TypeScript, Node.js (Express), and uses PostgreSQL via Prisma ORM to provide robust RESTful endpoints for user, product, and transaction management.

## ✨ Features

* **Authentication:** JWT-based user authentication using `jsonwebtoken` and `bcryptjs`.
* **Security:** Implements standard security headers (`helmet`), CSRF protection (`csurf`), and rate limiting.
* **Data Integrity:** Input validation handled by Zod.
* **Database:** Type-safe persistence with **Prisma ORM** and **PostgreSQL**.
* **File Uploads:** Supports asset uploads using `multer`.

## ⚙️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Language** | TypeScript | Statically typed language for maintainability. |
| **Runtime** | Node.js / Express.js | Minimal web framework for REST APIs. |
| **Database** | PostgreSQL | Primary data store. |
| **ORM** | Prisma | Type-safe database access. |
| **Validation** | Zod | Schema validation. |

## 💻 Quick Setup

### Prerequisites

* Node.js (v18+)
* PostgreSQL

### Installation

1.  Clone the repo:
    ```bash
    git clone [https://github.com/your-username/ecommerce-api.git](https://github.com/your-username/ecommerce-api.git)
    cd ecommerce-api
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and configure `DATABASE_URL`, `JWT_SECRET`, and `PORT`.
4.  Setup database schema:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

## ▶️ Running the Application

| Mode | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs with `ts-node-dev` for hot-reloading. |
| **Production** | `npm start` | Builds (`npx tsc`) and runs compiled JavaScript. |

## 👥 Contributors

* Min Khant
* Aung Myo Aye