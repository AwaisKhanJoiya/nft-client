import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {

    const [isAuth, setIsAuth] = useState()


    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {props.children}
        </AuthContext.Provider>
    )
}