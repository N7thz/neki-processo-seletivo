import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"
import {
    UserRequest, SkillRequest, Market, UserResponse, FormLoginProps, SkillResponse
} from "@/types"
import { useUser } from "@/context/user-context"

export const useService = () => {

    const [token, setToken] = useState<string>('')
    const { user } = useUser()

    useEffect(() => {

        const tokenStorage = localStorage.getItem("token")

        if (tokenStorage) {

            setToken(tokenStorage)
        }

    }, [])

    const api = axios.create({

        baseURL: 'http://localhost:8080/api',
        headers: {

            'Authorization': token
        }
    })

    function login(user: FormLoginProps): Promise<AxiosResponse> {

        const url = '/users/login'

        return api.post(url, user)
    }

    function createUser(user: UserRequest): Promise<AxiosResponse> {

        const url = '/users'

        return api.post(url, user)
    }

    function createSkill(skill: SkillRequest): Promise<AxiosResponse> {

        const url = '/skills'

        return api.post(url, skill)
    }

    function getSkillByIdUser(id: number): Promise<AxiosResponse> {

        const url = `/skills/${id}`

        return api.get(url)
    }

    function deleteSkill(id: number): Promise<AxiosResponse> {

        const url = `/skills/${id}`

        return api.delete(url)

    }

    function updateSkill(
        id: number, skill: any): Promise<AxiosResponse> {

        const url = `/skills/${id}`

        return api.put(url, skill)
    }

    function addToMarket(market: Market): Promise<AxiosResponse> {

        const url = '/market'

        return api.post(url, market)
    }

    function getMarketItens(): Promise<AxiosResponse> {

        const url = '/market'

        return api.get(url)
    }

    function getUserLogado(id: string): Promise<AxiosResponse> {

        const url = `/users/${id}`

        return api.get(url)
    }

    function buySkill(marketId: number): Promise<AxiosResponse> {

        const url = `/market/${user?.id}`

        const request = {

            id: marketId
        }

        return api.post(url, request)
    }

    return {

        login,
        createUser,
        createSkill,
        getSkillByIdUser,
        deleteSkill,
        updateSkill,
        addToMarket,
        getMarketItens,
        getUserLogado,
        buySkill,
        api
    }
}



