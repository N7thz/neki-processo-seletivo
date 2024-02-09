"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { FormRegisterSkill } from "@/components/form-register-skill"
import { MySkillsBoard } from "@/components/my-skills-board"

export default function Home() {

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

    return (

        <>
            <div
                className="flex min-h-screen justify-center items-center backgroundHome absolute inset-0 -z-50"
            >
                <Card
                    className="w-10/12 max-h-[700px] items-center bg-zinc-200 border border-violet-500 overflow-y-scroll scrollbar-none hover:scrollbar-thin scrollbar-thumb-rounded-full
                                scrollbar-thumb-violet-500 scrollbar-track-zinc-100  dark:bg-zinc-950/95 dark:scrollbar-track-zinc-900"
                >
                    <CardHeader
                        className="w-full flex-row justify-end items-center"
                    >

                        <Button
                            className="w-1/3"
                            onClick={() => setIsFormOpen(!isFormOpen)}
                        >
                            Adicionar skill
                        </Button>
                    </CardHeader>
                    <MySkillsBoard />
                </Card>
            </div >

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

