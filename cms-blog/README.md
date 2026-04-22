CMS Blog (Next.js + Prisma + SQLite)

Quick start

1. Install dependencies
   npm install

2. Configure environment
   Copy .env if needed and set ADMIN_PASSWORD (optional)
   ADMIN_PASSWORD="your-strong-password"

3. Setup database
   npx prisma migrate dev

4. Run dev server
   npm run dev

Features

- Public blog list at /
- Post detail at /post/[slug]
- Admin login at /admin/login (default password admin123; override via ADMIN_PASSWORD)
- Admin dashboard at /admin to create, edit, delete posts

Tech

- Next.js App Router, TypeScript, Tailwind CSS
- Prisma ORM with SQLite (file: ./prisma/dev.db)

Notes

- For production, set a strong ADMIN_PASSWORD and run on a proper DB if needed.
- Sessions are simplified; for real-world use, integrate a session store.
