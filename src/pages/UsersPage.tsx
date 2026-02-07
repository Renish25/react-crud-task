import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Paper,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Stack,
    useMediaQuery,
    Card,
    CardContent,
    Divider,
    type TableCellProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { User } from "../types/user";
import {
    getUsers,
    deleteUser,
} from "../api/userApi";
import { useNavigate } from "react-router-dom";
export interface Column {
    dataKey: string;
    label: string;
    align?: TableCellProps["align"];
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const tableColumn: Column[] = [
        { dataKey: "firstName", label: "First Name" },
        { dataKey: "lastName", label: "Last Name" },
        { dataKey: "phone", label: "Phone" },
        { dataKey: "email", label: "Email" },
        { dataKey: "actions", label: "Actions", align: "right" },
    ]

    /* -------------------- API CALLS -------------------- */

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getUsers();
            if (!res.data || !Array.isArray(res.data)) {
                setError("Invalid data received from server");
            } else {
                setUsers(res.data);
            }
        } catch (err) {
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUser(id);
            fetchUsers();
        } catch {
            setError("Failed to delete user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Box px={{ xs: 2, sm: 3, md: 4 }} py={{ xs: 2, sm: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography variant={isMobile ? "h5" : "h4"} mb={3}>
                    User Management
                </Typography>
                <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate("/users/new")}>
                    Add User
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Paper sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" mb={2}>
                    Users List
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : users.length === 0 ? (
                    <Typography>No users found</Typography>
                ) : isMobile ? (
                    /* -------- MOBILE CARD VIEW -------- */
                    <Stack spacing={2}>
                        {users.map((user) => (
                            <Card key={user.id} variant="outlined">
                                <CardContent>
                                    <Typography fontWeight={600}>
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.email}
                                    </Typography>
                                    <Typography variant="body2">{user.phone}</Typography>

                                    <Divider sx={{ my: 1 }} />

                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => navigate(`/users/${user.id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            variant="outlined"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                ) : (
                    /* -------- DESKTOP TABLE VIEW -------- */
                    <Box sx={{ overflowX: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {tableColumn.map((col) => (
                                        <TableCell key={col.dataKey} align={(col.align) || "left"}>
                                            {col.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users?.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.firstName}</TableCell>
                                        <TableCell>{user.lastName}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => navigate(`/users/${user.id}/edit`)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}