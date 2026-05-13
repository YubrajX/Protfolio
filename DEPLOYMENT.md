# Deployment Guide

This portfolio is built with the **T3 Stack** (Next.js, Tailwind, TypeScript) + **Prisma** & **MongoDB**.

## Prerequisites

1.  **GitHub Repository**: Push this code to a GitHub repository.
2.  **Vercel Account**: For hosting the frontend/API.
3.  **MongoDB Atlas Account**: For the database.

## Step 1: Database Setup (MongoDB Atlas)

1.  Create a Cluster in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a Database User (Username/Password).
3.  Get the **Connection String** (Drivers > Node.js).
    *   Format: `mongodb+srv://<username>:<password>@cluster0.p8yav.mongodb.net/portfolio?retryWrites=true&w=majority`
4.  Allow Access from Anywhere (`0.0.0.0/0`) in Network Access (or specifically Vercel IPs if you prefer).

## Step 2: Vercel Deployment

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard) -> **Add New Project**.
2.  Import your GitHub repository.
3.  **Environment Variables**:
    *   `DATABASE_URL`: Your MongoDB connection string.
    *   `AUTH_SECRET`: Generate one using `openssl rand -base64 32` or an online generator.
    *   `NEXT_PUBLIC_APP_URL`: Your production URL (e.g., `https://your-portfolio.vercel.app`).
    *   `SMTP_HOST`: `smtp.gmail.com` (or your provider)
    *   `SMTP_PORT`: `587`
    *   `SMTP_USER`: Your email address.
    *   `SMTP_PASS`: Your App Password (NOT your login password).
4.  **Build Command**: `npx prisma generate && next build` (Vercel usually detects `next build`, but `prisma generate` is critical).
    *   *Note:* You might need to add a "Build Command" override in Vercel settings: `npx prisma generate && next build`.

## Step 3: Post-Deployment

1.  **Seed the Database (Optional)**:
    *   You can run the seed script locally pointing to the production DB, OR
    *   Manually create the Admin User in your MongoDB collection if you can't run the seed script against prod.
    *   *Recommendation:* Log in to the deployed site. If you can't log in because the admin user doesn't exist, connect your local Prisma Studio to the **production** `DATABASE_URL` and create the user manually or run `npx prisma db seed`.

2.  **Verify SEO**:
    *   Check `sitemap.xml` at `/sitemap.xml`.
    *   Check `robots.txt` at `/robots.txt`.

## Troubleshooting

*   **Prisma Client Error**: Ensure `npx prisma generate` runs before the build.
*   **Image Issues**: If you use a new image host, add it to `next.config.ts`.
