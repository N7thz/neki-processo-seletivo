"use client"

import { useState } from 'react'

import { useService } from '@/api'
import { FormRegisterUserSchema } from '@/schemas'
import { FormRegisterUserProps, UserRequest } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Eye, EyeOff, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { AlertBox } from './alert-box'
import { Button } from './ui/button'
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle
} from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const FormRegister = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isRegister, setIsRegister] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const router = useRouter()
    const { createUser } = useService()

    const {

        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormRegisterUserProps>({

        resolver: zodResolver(FormRegisterUserSchema)
    })

    const onSubmit = (data: FormRegisterUserProps) => {

        setIsRegister(true)

        const { username, email, password } = data

        const user: UserRequest = {
            userName: username,
            email: email,
            password: password,
            perfil: 1
        }

        createUser(user)
            .then(() => {

                setIsRegister(true)

                setTimeout(() => {

                    setIsRegister(false)
                    router.push("/")
                }, 2500)
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
                        Cadastro
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
                                className='w-full p-2 flex flex-col justify-start gap-2 capitalize'
                            >
                                <Label
                                    htmlFor='username'
                                    className='pl-1 text-md'
                                >
                                    user name:
                                </Label>

                                <Input
                                    id='username'
                                    className={
                                        errors.username &&
                                        "border-2 border-red-500"
                                    }
                                    {...register("username")}
                                />

                                {
                                    errors.username &&
                                    <span
                                        className='text-red-500 text-md italic mt-1 lowercase'
                                    >
                                        {errors.username.message}
                                    </span>
                                }
                            </div>

                            <div
                                className='w-full p-2 flex flex-col justify-start gap-2 capitalize'
                            >
                                <Label
                                    htmlFor='email'
                                    className='pl-1 text-md'
                                >
                                    e-mail:
                                </Label>

                                <Input
                                    id='email'
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
                                className='w-full p-2 flex flex-col justify-start gap-2 capitalize'
                            >
                                <Label
                                    htmlFor='password'
                                    className='pl-1 text-md relative'
                                >
                                    senha:

                                    {
                                        isVisible
                                            ? <EyeOff
                                                size={16}
                                                onClick={() => setIsVisible(!isVisible)}
                                                className='absolute top-[180%] right-2 cursor-pointer'
                                            />
                                            : <Eye
                                                size={16}
                                                onClick={() => setIsVisible(!isVisible)}
                                                className='absolute top-[180%] right-2 cursor-pointer'
                                            />
                                    }
                                </Label>

                                <Input
                                    id='password'
                                    className={
                                        errors.password &&
                                        "border-2 border-red-500"
                                    }
                                    type={

                                        isVisible
                                            ? 'text'
                                            : 'password'
                                    }
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

                            <div
                                className='w-full p-2 flex flex-col justify-start gap-2 capitalize'
                            >
                                <Label
                                    htmlFor='confirm_password'
                                    className='pl-1 text-md relative'
                                >
                                    confirmar senha:

                                    {
                                        isVisible
                                            ? <EyeOff
                                                size={16}
                                                onClick={() => setIsVisible(!isVisible)}
                                                className='absolute top-[180%] right-2 cursor-pointer'
                                            />
                                            : <Eye
                                                size={16}
                                                onClick={() => setIsVisible(!isVisible)}
                                                className='absolute top-[180%] right-2 cursor-pointer'
                                            />
                                    }
                                </Label>

                                <Input
                                    id='confirm_password'
                                    className={
                                        errors.confirm_password &&
                                        "border-2 border-red-500"
                                    }
                                    type={

                                        isVisible
                                            ? 'text'
                                            : 'password'
                                    }
                                    {...register("confirm_password")}
                                />

                                {
                                    errors.confirm_password &&
                                    <span
                                        className='text-red-500 text-md italic mt-1 lowercase'
                                    >
                                        {errors.confirm_password.message}
                                    </span>
                                }
                            </div>
                        </div>

                        <Link
                            className='text-violet-400 text-md mt-2 hover:underline'
                            href={"/"}
                        >
                            faça o login
                        </Link>
                    </CardContent>

                    <CardFooter
                        className='flex justify-end items-center'
                    >
                        <Button
                            className='w-2/3'
                            type='submit'
                        >
                            Cadastrar
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {
                isRegister &&

                <AlertBox
                    className="text-green-500"
                    title="cadastro efetuado!"
                    message="o usuario foi cadastrado com sucesso"
                >
                    <Check />
                </AlertBox>

            }

            {
                isError &&

                <AlertBox
                    className="text-red-500"
                    title="error ao cadastrar"
                    message="não foi possivel cadastrar o usuário"
                >
                    <XCircle />
                </AlertBox>
            }
        </>
    )
}

