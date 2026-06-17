# 🎓 LMS Web3 Application (Monorepo)

A modern, professional Learning Management System (LMS) powered by a Monorepo architecture, connected to a smart database, and integrated with forward-looking Web3 and Blockchain capabilities.

---

## 🛠️ Tech Stack

### **Backend (apps/backend)**
* **Framework:** NestJS (Node.js Robust Framework)
* **ORM:** Prisma 7 (Utilizing the new multi-file structure with `prismaSchemaFolder`)
* **Database:** MySQL
* **Architecture:** Modular, Clean Architecture

### **Frontend (apps/web)**
* **Framework:** Next.js (React Framework)
* **State Management:** Zustand
* **Data Fetching:** React Query (TanStack Query)

---

## 📂 Database Folder Structure (Prisma 7 Multi-Schema)

Instead of using a traditional, cluttered, single `schema.prisma` file, this project leverages Prisma 7's multi-file feature to manage modules independently and cleanly:

```text
prisma/
└── schema/
    ├── _provider.prisma     # Client configuration & MySQL database connection
    ├── user.prisma          # User management module
    ├── course.prisma        # Courses & educational content module
    ├── progress.prisma      # Student progress tracking module
    └── certificate.prisma   # Certificate issuance module