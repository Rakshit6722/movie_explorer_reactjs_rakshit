import { createContext, ReactNode, useContext } from "react";
import TokenManager from "../components/hooks/TokenManager";

type AuthContextType = {
    isAuthenticated: boolean;
    checkAndHandleToken: () => void;

}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {

    const tokenManager = TokenManager()

    return (
        <AuthContext.Provider value={tokenManager}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context
}