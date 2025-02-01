import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { UserProvider } from "../context/UserProvider"
import { useUsers } from "../hooks/useUsers"
import { RegisterPage } from "../pages/RegisterPage"
import { UsersPage } from "../pages/UsersPage"

export const UserRoutes = () => {
    return (
        <>
            <UserProvider>
                <Navbar />
                <Routes>
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="users/edit/:id" element={<RegisterPage />} />
                    <Route path="/" element={<Navigate to="/users" />} />
                </Routes>
            </UserProvider>
        </>
    )
}