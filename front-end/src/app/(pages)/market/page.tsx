"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { twMerge } from "tailwind-merge"
import { SkillsBoard } from "@/components/skills-board"

export default function Market() {

    const [isLeft, setIsleft] = useState<boolean>(true)

    return (

        <div
            className="flex min-h-screen justify-center items-center backgroundImage absolute inset-0 -z-10"
        >
            <Card
                className="w-10/12 max-h-[700px] items-center bg-zinc-200 border border-violet-500 overflow-y-scroll scrollbar-none hover:scrollbar-thin  scrollbar-thumb-rounded-full scrollbar-thumb-violet-500 scrollbar-track-zinc-100  dark:bg-zinc-950/95 dark:scrollbar-track-zinc-900"
            >
                <div
                    className="w-full flex justify-center items-center p-2 gap-4 capitalize mt-4"
                >
                    <Button
                        onClick={() => setIsleft(!isLeft)}
                        variant="outline"
                        className={twMerge(
                            "w-1/3",
                            isLeft &&
                            "border border-violet-500 text-violet-500"
                        )}
                    >
                        Todas skills
                    </Button>

                    <Button
                        onClick={() => setIsleft(!isLeft)}
                        variant="outline"
                        className={twMerge(
                            "w-1/3",
                            !isLeft &&
                            "border border-violet-500 text-violet-500"
                        )}
                    >
                        Minhas skills
                    </Button>
                </div>

                <SkillsBoard
                    isLeft={isLeft}
                />
            </Card>
        </div >
    )
}

