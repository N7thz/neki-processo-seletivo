"use client"

import { useService } from "@/api"
import { UserResponse, userContextProps } from "@/types"
import {

    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

const UserContext = createContext({} as userContextProps)

export function UserProvider({ children }: { children: ReactNode }) {

    const { getUserLogado } = useService()

    const [user, setUser] = useState<UserResponse | null>(null)

    useEffect(() => {

        const id = localStorage.getItem("id")

        if (id && user == null) {

            getUserLogado(id)
                .then(res => setUser(res.data))
                .catch(err => console.log(err))
        }

    }, [getUserLogado, user])

    const value: userContextProps = {

        user, setUser
    }

    return (

        <UserContext.Provider value={value}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)