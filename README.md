# React + TypeScript + Vite

React CRUD User Management App

A simple React + TypeScript CRUD application for managing users, built as part of a technical assessment.
The app is designed with extensibility in mind, allowing new form fields to be added with minimal code changes.

🚀 Live Demo

👉 Deployed App: Add your Vercel link here
👉 GitHub Repository: https://github.com/Renish25/react-crud-task.git

⚙️ Setup Instructions
1️⃣ Clone the repository

git clone https://github.com/Renish25/react-crud-task.git
cd react-crud-task

2️⃣ Install dependencies
npm install

3️⃣ Start JSON Server (Mock API)

Create a db.json file at the project root (if not exists):
{
  "users": []
}

Start JSON Server using:
npm run api

create .env file and add:
VITE_APP_BACKEND_URL = "http://localhost:3001"

4️⃣ Start the React app using

npm run dev

App runs at: http://localhost:5173


🧩 How to Add New Fields (Extensibility)

The form is configuration-driven, so adding a new field requires minimal changes.

Step 1: Add new User type (if needed):
at ./src/types/user.ts

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

Step 2: Add field in userFormConfig.ts like:
{
  input: "date",
  name: "dob",
  label: "Date of Birth",
  required: true
}

        or
{
  input: "radio", // select
  name: "",
  label: "",
  type: "",
  required: true,
  options: [
      { label: "", value: "" },
  ],
},


Supported input types:

text
number
textArea
checkbox
radio
select
date


Step 3: Validation is automatic ✅

Validation rules are generated dynamically from userFormConfig using Yup.
Fields marked required: true are automatically required
No need to manually update the schema for every field
🧠 Design Decisions & Assumptions

JSON Server is used to mock backend APIs
React Hook Form + Controller is used for controlled MUI components
Config-driven form ensures scalability and maintainability
Dates are handled using native HTML date input (YYYY-MM-DD)
Validation logic is centralized and reusable

🧪 Error Handling

API errors handled gracefully with user-friendly messages
Loading indicators shown during API calls
Form validation errors displayed inline

🌍 Deployment

The app is deployed using Vercel.

🛠 Tech Stack

React (Vite)
TypeScript
Material UI (MUI)
React Hook Form
Yup (schema validation)
Axios
JSON Server (mock REST API)
React Router DOM

✨ Features

User Management (CRUD)
Create new user
View user list
Edit existing user
Delete user
Form Features
Config-driven dynamic form rendering
Field-level validation
Required field enforcement
Edit mode with prefilled values
Error messages & loading states
UI / UX
Clean, minimal UI using Material UI
Responsive layout (mobile & desktop)

Separate pages for:

User List
Add User
Edit User

Project Structure
  src/
  ├── api/              # API calls (Axios)
  ├── components/       # Reusable components (UserForm)
  ├── config/           # Form configuration
  ├── pages/            # Page-level components
  ├── types/            # TypeScript interfaces
  ├── utils/            # Utilities (dynamic Yup schema)
  ├── App.tsx
  ├── main.tsx



Build command: npm run build

👤 Author

Renish Kalariya
Frontend Developer (React / TypeScript)