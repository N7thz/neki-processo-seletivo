import axios, { AxiosResponse } from "axios"
import { FormDataProps } from "../app"
import { UserRequest, SkillRequest, Market, UserResponse } from "../@types"
import { useState, useEffect } from "react"
import { getData, getDataJson } from "../util"
import { useUser } from "../context/UserContext"

export const useService = () => {

    const [token, setToken] = useState<string>('')
    const [user, setUser] = useState<UserResponse>()

    useEffect(() => {

        getToken()
        getMySkills()
    }, [])

    const api = axios.create({

        baseURL: 'http://localhost:8080/api',
        headers: {

            'Authorization': token
        }
    })

    const getMySkills = async () => {

        const storage: UserResponse = await getDataJson("userLogado")

        if (storage !== null) {

            setUser(storage)
        }
    }

    async function getToken() {

        const token = await getData("token")

        if (token !== undefined) {

            setToken(token)
        }
    }

    function login(user: FormDataProps): Promise<AxiosResponse> {

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

    async function getUserLogado(): Promise<AxiosResponse> {

        const url = `/users/${user?.id}`

        return  api.get(url)
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
        getUserLogado
    }
}



