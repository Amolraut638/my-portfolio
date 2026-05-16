<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=32&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=Amol+Raut's+Portfolio;Full+Stack+Developer;Backend+%7C+System+Design+%7C+AI" alt="Typing SVG" />

<br/>

[![Portfolio](https://img.shields.io/badge/🌐_Live_Portfolio-amolraut.vercel.app-6366F1?style=for-the-badge&logoColor=white)](https://amolraut.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Amolraut638-111827?style=for-the-badge&logo=github)](https://github.com/Amolraut638)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Amol_Raut-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/amolraut9272)

<br/>

![Made with React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=flat-square&logo=tailwindcss&logoColor=38BDF8)
![Node.js](https://img.shields.io/badge/Node.js-1a1a1a?style=flat-square&logo=nodedotjs&logoColor=3C873A)
![MongoDB](https://img.shields.io/badge/MongoDB-1a1a1a?style=flat-square&logo=mongodb&logoColor=47A248)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## ✨ Overview

A modern, fully responsive developer portfolio built with **React + Tailwind CSS**, featuring a custom **blog platform** with admin authentication, rich text editing, and Cloudinary image uploads — all deployed on Vercel.

> Designed to stand out. Built to scale.

---

## 🗂️ Project Structure

```
my-portfolio/
├── client/                  # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── blog/        # Blog-specific components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About_me.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Timeline.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── NewFeatureBadge.jsx
│   │   ├── pages/           # Blog pages
│   │   │   ├── Blogs.jsx
│   │   │   ├── BlogDetail.jsx
│   │   │   ├── BlogEditor.jsx
│   │   │   └── AdminLogin.jsx
│   │   └── context/
│   │       └── AuthContext.jsx
│   └── vercel.json
│
└── server/                  # Node.js + Express backend
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── vercel.json
```

---

## 🚀 Features

### 🎨 Portfolio

| Feature | Description |
|---|---|
| **Hero Section** | Animated rotating text, stats counter, social links |
| **About Me** | Focus area cards + project highlights |
| **Journey** | Timeline of education & experience |
| **Skills** | Categorized skill grid with hover effects |
| **Projects** | 3-column grid, hover overlay with live demo links |
| **Contact** | EmailJS-powered contact form with validation |
| **Navbar** | Scroll-spy active states, animated underline, slide-in mobile drawer |
| **Background** | Animated gradient orbs for depth |
| **Responsive** | Fully optimized for mobile, tablet, and desktop |
| **Animations** | Framer Motion throughout — fadeUp, stagger, spring |

### 📝 Blog Platform

| Feature | Description |
|---|---|
| **Public Blog Listing** | Search by title + filter by tags |
| **Single Blog View** | Full rich text rendering with `@tailwindcss/typography` |
| **Admin Auth** | JWT-based authentication, bcrypt password hashing |
| **Secret Login** | Triple-click on "My Blog" heading to access admin login |
| **Rich Text Editor** | React Quill WYSIWYG editor with dark theme |
| **Image Upload** | Cloudinary integration for cover images |
| **Auto Slug** | Blog slugs auto-generated from title |
| **New Feature Badge** | Animated popup with progress bar, shooting star, auto-dismiss |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS** — custom theme (darkBg, primary, accent)
- **Framer Motion** — animations
- **React Router DOM** — client-side routing
- **React Quill** — rich text blog editor
- **Axios** — API calls
- **Lucide React** + **React Icons** — iconography
- **EmailJS** — contact form

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose** — database
- **JWT** — admin authentication
- **Bcryptjs** — password hashing
- **Cloudinary** + **Multer** — image uploads
- **CORS** + **Dotenv**

### Deployment
- **Vercel** — both frontend and backend
- **MongoDB Atlas** — cloud database
- **Cloudinary** — image CDN

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repo
```bash
git clone https://github.com/Amolraut638/my-portfolio.git
cd my-portfolio
```

### 2. Setup Server
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_email@gmail.com
ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Generate bcrypt hash for your password:
```bash
node -e "import('bcryptjs').then(b => b.default.hash('your_password', 10).then(h => console.log(h)))"
```

Start server:
```bash
npm run dev
```

### 3. Setup Client
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_SERVICE_ID=your_emailjs_service_id
VITE_TEMPLATE_ID=your_emailjs_template_id
VITE_PUBLIC_KEY=your_emailjs_public_key
```

Start client:
```bash
npm run dev
```

---

## 🔐 Admin Access

The blog admin panel is intentionally hidden from public view.

To access it:
1. Go to `/blogs`
2. **Triple-click** on the "My Blog" heading
3. Enter your admin credentials
4. The **Write Blog** button appears after login

---

## 📡 API Endpoints

### Auth
```
POST /api/auth/login     → Admin login → returns JWT
```

### Blogs (Public)
```
GET  /api/blogs          → Fetch all published blogs
GET  /api/blogs/:slug    → Fetch single blog by slug
```

### Blogs (Admin — requires Bearer token)
```
POST   /api/blogs        → Create blog + image upload
PUT    /api/blogs/:id    → Update blog
DELETE /api/blogs/:id    → Delete blog
```

---

## 🌐 Deployment

Both client and server are deployed on **Vercel**.

### Frontend (client)
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Add `VITE_API_URL` env variable pointing to server URL

### Backend (server)
- Root Directory: `server`
- Framework: Other
- Add all `.env` variables in Vercel project settings

---

## 📬 Contact

**Amol Raut** — Backend-focused Full Stack Developer

[![Email](https://img.shields.io/badge/Email-amolraut1902@gmail.com-6366F1?style=flat-square&logo=gmail&logoColor=white)](mailto:amolraut1902@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-amolraut9272-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/amolraut9272)
[![GitHub](https://img.shields.io/badge/GitHub-Amolraut638-111827?style=flat-square&logo=github)](https://github.com/Amolraut638)
[![LeetCode](https://img.shields.io/badge/LeetCode-Amolraut638-FFA116?style=flat-square&logo=leetcode&logoColor=white)](https://leetcode.com/u/Amolraut638/)
[![Portfolio](https://img.shields.io/badge/Portfolio-amolraut.vercel.app-6366F1?style=flat-square)](https://amolraut.vercel.app)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with 💜 by [Amol Raut](https://amolraut.vercel.app)

</div>
