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

    skill: {
        id: number
        name: string
        description: string
        imageURL: string
        level: number
        market: boolean
    },
    price: number
    created_at: Date
    id: number
}