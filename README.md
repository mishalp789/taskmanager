# TaskManager (Full-Stack Project)

[![Java](https://img.shields.io/badge/Java-17-blue)](https://www.oracle.com/java/)  
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-brightgreen)](https://spring.io/projects/spring-boot)  
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0-green)](https://www.mongodb.com/)

A full-stack **Task Manager** web application built with **Spring Boot** (backend) and **React + Vite** (frontend) using **MongoDB**.  
Users can **create, view, update, and delete tasks** with a responsive UI.

---

## 🚀 Features

- Add new tasks with **title, description, and status**  
- View all tasks in a **dynamic task list**  
- Toggle task **completion status** (done/pending)  
- Delete tasks  
- Fully **reactive frontend** connected to backend APIs  
- Ready for **future enhancements** like authentication and Docker deployment  

---

## 🛠 Tech Stack

| Layer        | Technology                         |
|--------------|-----------------------------------|
| Backend      | Java 17, Spring Boot 3.5.5        |
| Database     | MongoDB                            |
| Frontend     | React 18, Vite                     |
| API          | REST, Axios                        |
| Optional     | React Router DOM, Tailwind CSS     |

---

## 📂 Project Structure

### Backend
backend/
│── src/main/java/com/example/taskmanager/
│ ├── model/Task.java
│ ├── repository/TaskRepository.java
│ ├── service/TaskService.java
│ ├── service/impl/TaskServiceImpl.java
│ └── controller/TaskController.java
│── src/main/resources/application.properties
└── pom.xml

### Frontend

frontend/
│── src/
│ ├── components/
│ │ ├── TaskForm.jsx
│ │ └── TaskList.jsx
│ ├── pages/
│ │ └── Home.jsx
│ ├── services/
│ │ └── taskService.js
│ ├── App.jsx
│ └── main.jsx
└── package.json


---------------------------------------------------------------------------------




