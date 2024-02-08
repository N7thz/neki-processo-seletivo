"use client"

import React, { useEffect, useState } from 'react'

import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle
} from './ui/card'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { useForm } from "react-hook-form"
import Link from 'next/link'
import { FormLoginProps } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormLoginSchema } from '@/schemas'
import { useRouter } from 'next/navigation'
import { useService } from '@/api'
import { XCircle } from 'lucide-react'
import { Checkbox } from './ui/checkbox'

export const FormLogin = () => {

    const [isError, setIsError] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {

        const emailStorage = localStorage.getItem("email")
        const passwordStorage = localStorage.getItem("password")

        if (emailStorage && passwordStorage) {

            setEmail(emailStorage)
            setPassword(passwordStorage)
        }

    }, [])

    const router = useRouter()
    const { login } = useService()

    const {

        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLoginProps>({

        resolver: zodResolver(FormLoginSchema)
    })

    const onSubmit = (data: FormLoginProps) => {

        login(data)
            .then((res) => {

                if (res.status == 200) {

                    if (isChecked) {

                        localStorage.setItem("password", data.password)
                        localStorage.setItem("email", data.email)
                    } else {

                        localStorage.removeItem("password")
                        localStorage.removeItem("email")
                    }

                    localStorage.setItem("token", res.data.token)
                    
                    localStorage.setItem("id", res.data.userResponse.id)

                    router.push("/home")
                }
            })
            .catch(() => {

                setIsError(true)

                setTimeout(() => {

                    setIsError(false)
                }, 2000)
            })
    }

    return (

        <>
            <Card
                className='border-violet-500 border-2 bg-zinc-200/85  dark:bg-zinc-900/95 w-1/3 min-w-[220px] min-h-[400px] flex flex-col justify-around'
            >
                <CardHeader
                    className='p-8'
                >
                    <CardTitle
                        className='text-4xl'
                    >
                        Login
                    </CardTitle>
                </CardHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='h-full flex flex-col justify-between gap-4'
                >
                    <CardContent
                        className='h-full flex flex-col justify-between gap-6'
                    >
                        <div
                            className='w-full flex flex-col justify-between gap-6'
                        >
                            <div
                                className='w-full p-2 flex flex-col justify-start gap-2'
                            >
                                <Label
                                    className='pl-1 text-md'
                                >
                                    Email:
                                </Label>

                                <Input
                                    id='email'
                                    defaultValue={email}
                                    className={
                                        errors.email &&
                                        "border-2 border-red-500"
                                    }
                                    type='email'
                                    {...register("email")}
                                />

                                {
                                    errors.email &&
                                    <span
                                        className='text-red-500 text-md italic mt-1 lowercase'
                                    >
                                        {errors.email.message}
                                    </span>
                                }
                            </div>
                            <div
                                className='w-full p-2 flex flex-col justify-start gap-2'
                            >

                                <Label
                                    className='pl-1 text-md'
                                >
                                    Senha:
                                </Label>

                                <Input
                                    id='password'
                                    defaultValue={password}
                                    className={
                                        errors.password &&
                                        "border-2 border-red-500"
                                    }
                                    type='password'
                                    {...register("password")}
                                />

                                {
                                    errors.password &&
                                    <span
                                        className='text-red-500 text-md italic mt-1 lowercase'
                                    >
                                        {errors.password.message}
                                    </span>
                                }
                            </div>
                        </div>

                        <div
                            className='w-full flex gap-2 items-center mt-2'
                        >
                            <Checkbox
                                id='check'
                                checked={isChecked}
                                onClick={() => setIsChecked(!isChecked)}
                            />
                            <Label
                                htmlFor='checkbox'
                            >
                                Lembre-se de mim
                            </Label>
                        </div>

                        <Link
                            className='text-violet-400 text-md mt-2 hover:underline'
                            href={"/register"}>
                            Cadastrar-se
                        </Link>
                    </CardContent>

                    <CardFooter
                        className='flex justify-end items-center'
                    >
                        <Button
                            className='w-2/3'
                            type='submit'
                        >
                            Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>


            {
                isError &&

                <Alert
                    className='absolute top-[2%] z-10 w-[400px] border border-violet-500'
                >
                    <AlertTitle
                        className='text-red-500 text-2xl flex justify-center items-center gap-2 '
                    >
                        <XCircle />
                        Error ao logar
                    </AlertTitle>
                    <AlertDescription
                        className='text-zinc-400 pl-4 flex justify-center'
                    >
                        email ou senha inválidos
                    </AlertDescription>
                </Alert>
            }
        </>
    )
}