import { Dispatch, SetStateAction } from "react"

export interface FormRegisterUserProps {

    username: string
    email: string
    password: string
    confirm_password: string
}

export interface FormLoginProps {

    email: string
    password: string
}

export interface userContextProps {

    user: UserResponse | null,
    setUser: Dispatch<SetStateAction<UserResponse | null>>
}

export interface UserRequest {

    userName: string,
    email: string,
    password: string,
    perfil: number
}

export interface UserResponse {

    id: number
    userName: string
    email: string
    perfil: string
    coins: number
    skills: SkillResponse[]
    notifications: Notification[]
}

export interface SkillRequest {

    name: string
    description: string
    imageURL: string
    level: number
    user: {
        id: number
    }
}

export interface SkillResponse {

    id: number
    name: string
    description: string
    imageURL: string
    level: number
    idUser: number
    market: boolean
}

export interface Notification {

    id: number
    message: string
}

export interface Market {

    skill: {
        id: number
    },
    price: number
}

export interface MarketResponse {

    skill: SkillResponse
    price: number
    created_at: Date
    id: number
}

export interface FormRegisterSkillProps {

    name: string
    description: string
    imageURL: string
    level: number
}

export interface FormRegisterSkillComponentProps {

    isFormOpen: boolean
    setIsFormOpen: Dispatch<SetStateAction<boolean>>
}