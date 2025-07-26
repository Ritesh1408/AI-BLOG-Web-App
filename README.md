# 🧠 Think Flare - AI Blog Generator & Summarizer

A full-stack AI-powered blogging platform that allows users to generate, write, and summarize blog content using **Gemini API**, with role-based access, secure authentication, and admin tools — ready for Dockerized deployment via **GitHub Actions** and **AWS EC2 Free Tier**.

---

## 🚀 Features

### ✍️ AI-Enhanced Blogging
- Get **blog post ideas** using Generative AI
- Generate **full blog posts** (title → summary → content)
- Auto-generate **relevant tags**
- Summarize blog posts or generate **AI replies**
- View last edited info with author tracking

### 🔐 Authentication & Role-Based Access
- **Email + Password authentication** (no Firebase for now)
- **JWT tokens** for secure backend access
- Two roles:
  - **Admin**: Invite-only access, full dashboard control
  - **Member**: Can create/manage own posts

### 📑 Admin Features
- Admin dashboard with:
  - Full post moderation (edit/delete any post)
  - See who last edited posts
  - Access AI tools (summarization, reply, tag assist)
- Invite system for admin signup with secret code

### 📤 Other Features
- File/image upload support
- WYSIWYG blog editor
- Commenting and interaction tools (in progress)

---

## 💡 Future Enhancements

- 🎙️ **Voice Assistant Integration**
  - Voice command-based blog writing (e.g., "start writing blog on climate change")
  - Read out blogs using text-to-speech
- 📈 Analytics dashboard
- 🧪 Content plagiarism checker
- 📨 Admin moderation queue
- 🔎 Full-text search and filter by tag, category, or author

---

## ⚙️ Tech Stack

| Layer        | Tech Used                         |
|--------------|-----------------------------------|
| Frontend     | React (Vite), Tailwind CSS        |
| Backend      | Node.js, Express.js               |
| AI API       | Gemini (Google Generative AI)     |
| Auth         | Email/Password + JWT              |
| DB           | MongoDB Atlas                     |
| State Mgmt   | Redux Toolkit (for future)        |
| Deployment   | Docker, GitHub Actions, AWS EC2   |

---

## 📁 Folder Structure

```

AI-BLOG-Web-App/
├── client/               # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── .gitignore
│
├── server/               # Node.js + Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   ├── Dockerfile
│   └── .gitignore
│
├── .github/workflows/    # GitHub Actions workflow
│   └── deploy.yml
├── docker-compose.yml    # Optional (local multi-service)
├── .gitignore
├── README.md

````

---

## 🧠 Gemini API Usage

Used for:

- Blog idea generation
- Post writing assistance (title → summary → full content)
- Tag extraction based on content
- Summarization and AI replies

> Gemini integration is handled in backend (`/utils/gemini.js`) using Google Generative AI SDK.

---

## 🐳 Docker Setup

Each service (`client`, `server`) has its own Dockerfile.  
Use Docker Compose for local development (optional).

```bash
# Build and run backend
cd server
docker build -t ai-blog-backend .
docker run -p 8000:8000 ai-blog-backend

# Build and run frontend
cd ../client
docker build -t ai-blog-frontend .
docker run -p 3000:80 ai-blog-frontend
````

---

## 🔁 GitHub Actions CI/CD (Auto Deploy to EC2)

* Automatically deploys on push to `main` branch
* Connects to EC2 using SSH
* Pulls latest code, rebuilds Docker containers

### Required Secrets (`GitHub → Settings → Secrets → Actions`)

| Name      | Description                      |
| --------- | -------------------------------- |
| EC2\_HOST | Your EC2 public IP               |
| EC2\_USER | Usually `ubuntu`                 |
| EC2\_KEY  | Private SSH key (`id_rsa` value) |
| EC2\_PORT | SSH port (default: `22`)         |

---

## 🌍 Deployment (AWS EC2 Free Tier)

1. Launch Ubuntu EC2 instance
2. Open ports: `22`, `80`, `8000`
3. Install Docker and Docker Compose:

   ```bash
   sudo apt update && sudo apt install docker.io docker-compose -y
   ```
4. Configure SSH key for GitHub Actions
5. Push to `main` → auto-deploy runs via Actions

---

## 🧪 Local Development

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

### `server/.env`

```env
PORT=8000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
ADMIN_INVITE_CODE=your_secret_code
GEMINI_API_KEY=your_google_generative_ai_key
```

### `client/.env`

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

> Create `.env.example` files for safe collaboration.

---

## 🧑‍💻 Author

**Ritesh1408**
📌 Building with 💻 + ☕ + 🧠 tools at the intersection of AI + Web
🔗 [GitHub Profile](https://github.com/Ritesh1408)

---

## 📄 License

MIT

---
