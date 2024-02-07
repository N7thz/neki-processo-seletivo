import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"
import { UserResponse } from "../@types"

interface UserContextProps {

    user: UserResponse | undefined
    setUser: Dispatch<SetStateAction<UserResponse | undefined>>
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<UserResponse>()

    return (

        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)