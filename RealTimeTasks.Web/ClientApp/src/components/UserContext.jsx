import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export default function UserContextComponent({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const { data } = axios.get('/api/account/getCurrentUser');
            setUser(data);
            setIsLoading(false);
        })();
    }, [])

    return <UserContext.Provider value={{ isLoading, user, setUser }}>
        {children}
    </UserContext.Provider>
}

export function useUser() { return useContext(UserContext) }