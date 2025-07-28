import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
// import { UserContext } from "./UserContext";

export const UserContext = createContext();

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openAuthForm, steOpenAuthForm] = useState(false);

    useEffect(() => {
        if(user) return;

        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            }finally{
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        // save token
        if (userData?.token) {
            localStorage.setItem("token", userData.token);
        }
        // localStorage.setItem("token", userData.token); 
        setLoading(false);
    };

    const clearUser = () => {
        setUser(null);
        // setSearchResults([]);
        localStorage.removeItem("token");
    };

    return <UserContext.Provider 
        value={{
            user,
            setUser,
            loading,
            updateUser,
            clearUser,
            openAuthForm,
            steOpenAuthForm,
        }}>
        {children}
    </UserContext.Provider>
};

export default UserProvider;
