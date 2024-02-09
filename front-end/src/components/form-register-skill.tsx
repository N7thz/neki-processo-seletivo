import { FC, useState } from "react"
import { useService } from "@/api"
import { useUser } from "@/context/user-context"
import { FormRegisterSkillSchema } from '@/schemas'
import {
    FormRegisterSkillComponentProps,
    FormSkillProps,
    SkillRequest
} from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, XCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { AlertBox } from "./alert-box"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export const FormRegisterSkill: FC<FormRegisterSkillComponentProps> = ({
    isFormOpen, setIsFormOpen
}) => {

    const { createSkill } = useService()
    const { user } = useUser()

    const [isRegister, setIsRegister] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const {

        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSkillProps>({

        resolver: zodResolver(FormRegisterSkillSchema)
    })

    const onSubmit = (data: FormSkillProps) => {

        const { name, description, imageURL, level } = data
        const id: number = Number(user?.id)

        if (name && description && imageURL && level) {

            const skill: SkillRequest = {

                name,
                description,
                imageURL,
                level: Number(level),
                user: {
                    id
                }
            }
            createSkill(skill)
                .then(() => {

                    setIsRegister(true)

                    setTimeout(() => {

                        setIsRegister(false)
                        window.location.reload()

                    }, 2500)
                })
                .catch(() => {

                    setIsError(true)

                    setTimeout(() => {

                        setIsError(false)
                    }, 2000)
                })
        }
    }

    return (

        <div
            className="min-h-screen z-40 bg-black/80 flex justify-center items-center absolute inset-0"
        >
            <Card
                className="border-2 border-violet-500 p-2 relative"
            >
                <Button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="rounded-full text-2xl w-8 h-8 absolute -top-3 -right-3"
                >
                    X
                </Button>
                <CardHeader>
                    <CardTitle>
                        Cadastrar Skill
                    </CardTitle>
                </CardHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CardContent>

                        <div
                            className='w-full p-2 flex flex-col justify-start gap-2 capitalize'
                        >
                            <Label
                                htmlFor="name"
                                className='pl-1 text-md'
                            >
                                nome:
                            </Label>

                            <Input
                                id="name"
                                className={
                                    errors.name &&
                                    "border-2 border-red-500"
                                }
                                {...register("name")}
                            />

                            {
                                errors.name &&
                                <span
                                    className='text-red-500 text-md italic mt-1 lowercase'
                                >
                                    {errors.name.message}
                                </span>
                            }
                        </div>

                        <div
                            className='w-full p-2 flex flex-col justify-start gap-2 capitalize'
                        >
                            <Label
                                htmlFor="description"
                                className='pl-1 text-md'
                            >
                                descrição:
                            </Label>

                            <Input
                                id="description"
                                className={
                                    errors.description &&
                                    "border-2 border-red-500"
                                }
                                {...register("description")}
                            />

                            {
                                errors.description &&
                                <span
                                    className='text-red-500 text-md italic mt-1 lowercase'
                                >
                                    {errors.description.message}
                                </span>
                            }
                        </div>

                        <div
                            className='w-full p-2 flex flex-col justify-start gap-2 capitalize'
                        >
                            <Label
                                htmlFor="imageURL"
                                className='pl-1 text-md'
                            >
                                imagem (URL):
                            </Label>

                            <Input
                                id="imageURL"
                                className={
                                    errors.imageURL &&
                                    "border-2 border-red-500"
                                }
                                {...register("imageURL")}
                            />

                            {
                                errors.imageURL &&
                                <span
                                    className='text-red-500 text-md italic mt-1 lowercase'
                                >
                                    {errors.imageURL.message}
                                </span>
                            }
                        </div>

                        <div
                            className='w-full p-2 flex flex-col justify-start gap-2 capitalize'
                        >
                            <Label
                                htmlFor="level"
                                className='pl-1 text-md'
                            >
                                level:
                            </Label>

                            <Input
                                id="level"
                                className={
                                    errors.name &&
                                    "border-2 border-red-500"
                                }
                                type="number"
                                max={999}
                                min={1}
                                {...register("level")}
                            />

                            {
                                errors.level &&
                                <span
                                    className='text-red-500 text-md italic mt-1 lowercase'
                                >
                                    {errors.level.message}
                                </span>
                            }
                        </div>
                    </CardContent>

                    <CardFooter
                        className="w-full flex justify-end gap-4"
                    >
                        <Button
                            type="submit"
                        >
                            Confirmar
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {
                isRegister &&

                <AlertBox
                    className="text-green-500"
                    title="cadastro efetuado!"
                    message="a skill foi adicionada com sucesso"
                >
                    <Check />
                </AlertBox>
            }

            {
                isError &&

                <AlertBox
                    className="text-red-500"
                    title="error ao cadastrar"
                    message="não foi possivel adicionar a skill"
                >
                    <XCircle />
                </AlertBox>
            }
        </div>
    )
}

