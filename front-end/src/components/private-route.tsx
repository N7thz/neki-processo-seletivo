import { app_routes } from "@/constants/app-routes"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

interface PrivateRouteProps {

    children: ReactNode
}

const checkUserAutheticated = () => {

    const token = localStorage.getItem("token")

    return !!token
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {

    const { push } = useRouter()

    const isUserAuthenticated = checkUserAutheticated()

    useEffect(() => { 

        if (!isUserAuthenticated) {

            push(app_routes.public.login)
        }
    }, [isUserAuthenticated, push])

    return (

        <>
            {!isUserAuthenticated && null}
            {isUserAuthenticated && children}
        </>
    )
}