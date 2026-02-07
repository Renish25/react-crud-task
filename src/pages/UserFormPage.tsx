import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { createUser, getUserById, updateUser } from "../api/userApi";
import { Alert, Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import UserForm from "../components/UserForm";
import { useNavigate, useParams } from "react-router-dom";

export default function UserFormPage() {

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchUserData = async () => {
        if (!id) return;

        setLoading(true);
        try {
            const response = await getUserById(Number(id));
            if (response) {
                setEditingUser(response.data);
            }

        } catch (error) {
            console.error("Error fetching user:", error);
            navigate("/users");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, [id, navigate]);

    const handleCreateOrUpdate = async (data: User) => {
        try {
            if (editingUser?.id) {
                await updateUser(editingUser.id, data);
            } else {
                await createUser(data);
            }
            navigate("/users");
        } catch {
            setError("Failed to save user");
        }
    };

    return (
        <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography variant="h6">
                    {id ? "Edit User" : "Add New User"}
                </Typography>

                <Button
                    variant="outlined"
                    onClick={() => navigate("/users")}
                >
                    Back
                </Button>
            </Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {id && loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 200,
                    }}
                >
                    <CircularProgress />
                </Box>
            )
                : (
                    <UserForm
                        onSubmit={handleCreateOrUpdate}
                        defaultValues={editingUser ?? undefined}
                    />
                )

            }
        </Paper>
    )
}