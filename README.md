# Movie Portal - Full-Stack Client

The Movie Portal is a sophisticated, performance-driven web application designed to provide users with a comprehensive movie and series discovery experience. Built with Next.js , it features real-time interactions, secure payments, and a powerful multi-role dashboard system.

## Key Modules & Functionalities

### Authentication & Security
Better-Auth Integration: Secure, session-based authentication. and jwt

Protected Routes: Middleware-level protection for sensitive dashboards.

Role-Based Access: Dynamic UI rendering based on `ADMIN`, `CREATOR`, and `USER` roles.

### Advanced Discovery System
Live Search: Find movies and TV series instantly by title.

Dynamic Sorting: Explore content by "Latest Added," "Top Rated, Choice."

### Interactive Media Experience
Detail Pages: Comprehensive view including synopsis, cast, director etc....
 
Rating System: A clean 1-10 star rating interface with instant feedback.
 
Admin Moderation: Reviews are flagged for admin approval before being visible to the public.

### Payment
Payment Gateway: Integrated with Stripe for seamless transactions.

Payment Models: Access to "Premium" content through on time payment.

Purchase History: Dedicated section for users to track their all puchased.

### Multi-Role Dashboards
Admin Dashboard: Manage all users, Movies, Series, Categories, Transactions,  moderate reviews, and view platform-wide sales analytics and Overview.

Creator Dashboard: Dedicated Overview and Channel management, My Movies, Upload Movie, My Series, Upload Series, Profile.

User Dashboard: Manage personal Overview user, Libary, My Comments, watchlist, Profile.

### Technical Implementation
Frontend Framework: Next.js App Router.

Styling: Tailwind CSS with Shadcn/UI for a consistent.

Data Fetching: Redux toolkit for efficient server-state management and caching.

Form Handling: Zod for robust client-side validation.

Responsive Engine: Fully fluid design that adapts from 4K monitors to small mobile screens.

## Setup instructions
Installation & Setup GitHub cli:

gh repo clone TwistMehedi/assigment-5-frontend-p-hero-l2

#### Install Dependencies:
npm install

#### Environment Configuration:
create .env file

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
 
npm run dev

Live URLs: https://movie-portal-client-ruddy.vercel.app

