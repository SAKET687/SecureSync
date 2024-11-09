/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useCallback, useContext } from "react";
import api, { setAuthToken } from "../utils/api.utils";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            setAuthToken(token);
            const fetchProfile = async () => {
                try {
                    const response = await api.get("/user/fetch-profile");
                    setUser(response.data);
                } catch (error) {
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem("token");
                    console.error(error);
                    toast.error(
                        "Failed to fetch profile. Please log in again."
                    );
                }
            };
            fetchProfile();
        }
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
