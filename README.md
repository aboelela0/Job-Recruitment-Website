
---

# 💼 Job Recruitment Website

## 📘 Overview

This project is an **online job recruitment platform** designed to streamline the interaction between job seekers, employers, and administrators. Built for the *Internet Programming (24CSCI04I)* course, the system enables secure user registration, job postings, applications, and platform moderation. It features a modern API-based backend with JWT authentication and role-based access control.

## 🌐 Project Scope

This platform facilitates:

* Direct and secure application submissions
* Employer access to qualified candidate pools
* Scalable infrastructure with admin oversight
* Accurate job matching via structured inputs

## 🧑‍🎓 User Roles

1. **Job Seeker**

   * Register/login
   * Upload resume and cover letter (PDF/DOC/DOCX)
   * Apply for job postings
   * Track application status

2. **Employer**

   * Post and manage job listings
   * View and update application statuses
   * Schedule interviews

## 🧾 Features

### 🔐 Authentication

* User registration and login
* JWT-secured endpoints
* Password hashing

### 📄 Job Postings

* Employers and admins can create, update, and remove listings
* All users can browse jobs
* Public visibility for job descriptions

### 📨 Applications System

* Resume and cover letter uploads (validated with Multer)
* File size limit: 5MB
* Employers review and update statuses (`Pending`, `Accepted`, `Rejected`)
* Job seekers track submissions via `/me` endpoint

### 👤 Profile Management

* View and update personal and professional information
* Role-based permissions and access control

### 🛡️ Security

* JWT-based protected endpoints
* File type/size validation
* Admin content moderation

## 🔁 Typical Workflow

1. A **job seeker** signs up and uploads a resume.
2. An **employer** posts a job.
3. The job seeker **applies** through the platform.
4. The employer **reviews** and **updates** the application status.
5. Notifications are sent accordingly.

## 📥 Inputs / 📤 Outputs

* **Inputs:** Job seeker data (profile, resume), employer job listings, applications
* **Outputs:** Job recommendations, application status, email alerts

## 🧪 Testing & Preliminary Data

* System tested with fake users and resumes to simulate real-world conditions.
* Emphasis on early bug detection and error handling before production.

## 📌 Assumptions

* Users provide valid and accurate information
* Users have internet access and active email accounts
* Resumes are submitted in PDF or DOCX format
* Job seekers check updates regularly

## 📂 API Documentation (Summary)

* `POST /signup` – Register new users
* `POST /login` – Authenticate user & return JWT
* `GET /jobs` – List all available jobs
* `POST /jobs` – (Employer/Admin) Create a new job
* `POST /applications` – Submit a job application
* `GET /applications/me` – View personal applications
* `PATCH /applications/:id` – (Employer) Update status
* `GET /users` – (Admin) View/manage user accounts

## ⚙️ Technologies Used

* **Backend:** Node.js, Express.js
* **Authentication:** JWT
* **File Uploads:** Multer
* **Database:** MongoDB / SQL (assumed, can be updated)
* **Frontend (if applicable):** HTML/CSS/JavaScript or React

---

