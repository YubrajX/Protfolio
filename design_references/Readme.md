# System-Level Design: Full-Stack Dynamic Portfolio & CMS

## 1. Project Vision
A 100% data-driven portfolio where the UI (Navigation, Form Fields), Content (Projects, Hero Text), and Metadata (SEO) are managed via a private Admin Dashboard and stored in MongoDB.

## 2. Updated Tech Stack
* **Framework:** Next.js 15+ (App Router)
* **Database:** MongoDB Atlas
* **ORM:** Prisma (for Type-Safe database queries)
* **Auth:** Auth.js (NextAuth) or Clerk (to protect the Admin Dashboard)
* **UI Components:** Tailwind CSS + Shadcn UI + Framer Motion (for smooth transitions)
* **Communications:** Resend (for email notifications on new contact entries)
* **Security:** Cloudflare Turnstile (Bot protection for the contact form)

## 3. Enhanced Database Schema (MongoDB Collections)

### A. `SiteSettings` (Single Document)
*Global configuration for SEO and Hero sections.*
* `heroTitle`: String
* `heroSubtitle`: String
* `bio`: String (Markdown supported)
* `socialLinks`: Array<{ platform: String, url: String, icon: String }>
* `seoKeywords`: Array<String>
* `ogImage`: String (URL)

### B. `NavItems` (Collection)
* `label`: String
* `path`: String
* `order`: Number
* `isActive`: Boolean

### C. `Projects` (Collection)
* `title`: String
* `slug`: String (for clean URLs like /projects/my-app)
* `content`: String (Rich text/Markdown)
* `status`: Enum ["Draft", "Published", "Archived"]
* `techStack`: Array<String>
* `githubUrl`: String
* `liveUrl`: String
* `featured`: Boolean (to pin to top)

### D. `ContactConfig` & `Submissions` (Collections)
* **Config:** Defines input fields (Name, Email, Budget, Message, etc.)
* **Submissions:** Stores user messages with `timestamp` and `ipAddress` (for rate limiting).

## 4. Key Architectural Features

### 🔐 Secure Admin Dashboard (`/admin`)
* **Protected Routes:** Use Next.js Middleware to redirect unauthenticated users away from `/admin`.
* **CRUD Interfaces:** Data tables to Edit/Delete projects and toggle Navigation visibility in real-time.
* **Draft Mode:** Ability to save projects as "Draft" so they exist in MongoDB but don't render on the live site.

### ⚡ Performance & Cache Invalidation
* **Incremental Static Regeneration (ISR):** Use `revalidatePath('/')` inside Admin Server Actions. 
* **Result:** When you click "Save" in the Admin panel, the website cache is purged and rebuilt instantly. Users get static-site speed with CMS flexibility.

### 🛡️ Security & Validation
* **Zod Validation:** Strict schema validation for both the Contact Form and the Admin inputs.
* **Turnstile Integration:** Verify the Cloudflare token in the `submitContact` Server Action before allowing a write to MongoDB.
* **Rate Limiting:** Prevent a single user from spamming the "Contact" button.

## 5. Implementation Roadmap for AI Assistant

1.  **Phase 1: Foundation.** Setup Next.js, Prisma, and MongoDB connection.
2.  **Phase 2: The Data Provider.** Create the `SiteSettings` and `NavItems` seed data and build the `Navbar` component to pull from them.
3.  **Phase 3: Admin Auth.** Configure Auth.js with a Google or GitHub provider, restricted to *your* specific email address.
4.  **Phase 4: Dynamic Rendering.** Build the Projects gallery and the Dynamic Contact Form based on the `ContactConfig` collection.
5.  **Phase 5: The Loop.** Implement Server Actions for the Admin Dashboard that use `revalidatePath` to update the live site instantly upon saving changes.