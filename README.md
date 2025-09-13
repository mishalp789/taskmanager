# 📝 Task Manager

A **full-stack task management application** that allows users to **register, log in, and manage tasks securely**.  
Built with **React (frontend)**, **Spring Boot (backend)**, and **PostgreSQL (database)**, this project demonstrates **end-to-end development**, **JWT authentication**, and **role-based access control**.

---

## ✨ Features
- 🔐 **User Authentication** (Register/Login) with JWT
- 🗂️ **Task Management** – Create, Read, Update, Delete (CRUD)
- 🔍 **Search Tasks** by title
- 📅 **Task Metadata** – priorities & due dates
- 👤 **User Ownership** – tasks are tied to the logged-in user
- 🛡️ **Role-based Access** – only the owner or admin can update/delete tasks
- 🌐 **RESTful APIs** with Spring Boot
- 🎨 **Responsive UI** with React + Bootstrap

---

## 🛠️ Tech Stack

### **Frontend**
- React 18 + Vite  
- React Router DOM  
- Axios  
- Bootstrap 5  

### **Backend**
- Spring Boot 3  
- Spring Security + JWT  
- Lombok  
- Swagger/OpenAPI  

### **Database**
- PostgreSQL  
- JPA/Hibernate  

---

## 📂 Project Structure
```
taskmanager/
├── backend/        # Spring Boot app (REST API + PostgreSQL)
│   ├── src/main/java/com/taskmanager/pro
│   ├── src/main/resources
│   └── pom.xml
├── frontend/       # React app (UI)
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## ⚡ Getting Started

### 🔹 Prerequisites
- [Java 17+](https://adoptium.net/)  
- [Maven](https://maven.apache.org/)  
- [Node.js 18+](https://nodejs.org/)  
- [PostgreSQL](https://www.postgresql.org/)  

---

### 🔹 Backend Setup
1. Configure `application.properties` with your PostgreSQL credentials.
2. Run the Spring Boot app:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
👉 Backend runs at: `http://localhost:8080/api`

---

### 🔹 Frontend Setup
1. Start the React app:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
👉 Frontend runs at: `http://localhost:5173`

---

## 📖 API Documentation
- Swagger UI: `http://localhost:8080/swagger-ui.html`  

---

## 👨‍💻 Author
**Muhammed Mishal**  
🔗 [GitHub](https://github.com/mishalp789) | [LinkedIn](https://linkedin.com/in/your-profile)
