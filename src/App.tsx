import { Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import UserFormPage from "./pages/UserFormPage";

export default function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/new" element={<UserFormPage />} />
        <Route path="/users/:id/edit" element={<UserFormPage />} />
      </Routes>
    </Container>
  );
}
