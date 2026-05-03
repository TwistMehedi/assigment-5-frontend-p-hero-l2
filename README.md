# Movie Portal - Full-Stack Client

The Movie Portal is a modern, fast, and user-friendly web application that allows users to easily discover, explore, and enjoy movies and TV series. It is built using Next.js, which ensures high performance, fast loading speed with skleton, and a smooth browsing experience. The platform is designed to be simple and easy to use for all types of users.

Users can browse different categories, search for their favorite movies or series, and get detailed information such as ratings, descriptions, and more. Users can comment there favorite and unfavorite movies and series. The application also includes real-time features that make the experience more interactive and dynamic.

Users can find any information about movies or web applications on our Movie Portal. Simply ask our AI chatbot, and it will provide accurate results based on your needs. You can get details about any movie or series, including best sales, ratings, reviews, and more.

In addition, the platform provides a secure online payment system, allowing users to safely purchase or access premium content. It also has a powerful multi-role dashboard system, where admins, creator and users have different controls and permissions. Admins can manage content, users, and activities, while normal users can manage their profiles and watchlists and creator can manage movies, series and all analaytics.

Overall, The Movie Portal is a complete and scalable solution for movie and series lovers, combining performance, security, and ease of use in one platform. 

## Key Modules & Functionalities

### Authentication & Security
Better-Auth Integration: Secure, session-based authentication and jwt.

Protected Routes: Middleware-level protection for sensitive dashboards.

Role-Based Access: Dynamic UI rendering based on `ADMIN`, `CREATOR`, and `USER` roles.

Demo login: Impement demo login system for all role based.

### Customer Support Ai Agent
Chat Bot: You can goted easy any information in movie-portal web-application ask the ai agent chat box see the right side of the screen on website.

### Advanced Discovery System
Live Search: Find movies and TV series instantly by title, category and add ai search suggestion.

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

