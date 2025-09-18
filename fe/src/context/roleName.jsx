import { createContext, useEffect, useState } from "react"
import { authProvider } from "./auth";

const RoleContext = createContext();
export default function RoleProvider({children}) {
    const [roleName, setRoleName] = useState(null);
    const safeGetRole = async () => {
        try {
            const userStr = authProvider.role;
            return userStr;
        } catch (e) {
            console.error("Error parsing user from localStorage:", e);
            return null;
        }
    };
    useEffect(() => {
        const role = safeGetRole();
        setRoleName(role);
    }, []);
    return (
        <RoleContext.Provider value={{roleName}}>
            {children}
        </RoleContext.Provider>
    )
}
export {RoleContext}