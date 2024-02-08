"use client"

import { FormRegisterSkill } from "@/components/formRegisterSkill"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useUser } from "@/context/user-context"
import { Search } from "lucide-react"
import { useState } from "react"

export default function Home() {

    const { user } = useUser()
    const [isFormOpen, setIsFormOpen] = useState<boolean>(true)

    if (user !== null) {

        const { skills } = user

        return (

            <>
                <div className="flex justify-center items-center min-h-[70vw] backgroundHome">

                    <Card
                        className="max-w-10/12 h-full flex flex-col justify-between items-center border-2 border-violet-500 p-4 bg-zinc-200 dark:bg-zinc-950/95"
                    >
                        <div
                            className="relative m-4"
                        >

                            <Input
                                placeholder="pesquise uma skill"
                            />

                            <Search
                                size={20}
                                className="absolute top-2.5 right-2"
                            />
                        </div>

                        <CardContent>
                            {
                                skills.length == 0
                                    ? <span className="italic text-zinc-300">
                                        você ainda não possui skills
                                    </span>
                                    : skills.map(skill =>
                                        <div
                                            key={skill.id}
                                        >
                                            {skill.description}
                                        </div>
                                    )
                            }
                        </CardContent>

                        <CardFooter>
                            <Button
                                onClick={() => setIsFormOpen(!isFormOpen)}
                            >
                                Adicionar skill
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {
                    isFormOpen &&
                    <FormRegisterSkill
                        isFormOpen={isFormOpen}
                        setIsFormOpen={setIsFormOpen}
                    />
                }
            </>
        )
    }
}