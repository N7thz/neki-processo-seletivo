import { FC, useEffect, useState } from "react"
import { CardSkillProps } from "@/types"
import { Card, CardContent, CardDescription } from "./ui/card"
import { twMerge } from "tailwind-merge"
import Image from "next/image"

export const CardSkill: FC<CardSkillProps> = ({
    skill, className }) => {

    const { name, description, imageURL, level } = skill
    const [background, setBackground] = useState<string>('')
    const [isClicked, setIsClicked] = useState<boolean>(false)

    useEffect(() => {

        handleChangeColor()
    }, [])

    const handleChangeColor = () => {

        if (level < 100) {

            setBackground("bg-blue-700")
        } else if (level < 300) {

            setBackground("bg-lime-500")
        } else if (level < 500) {

            setBackground("bg-sky-600")
        } else if (level < 700) {

            setBackground("bg-indigo-800")
        } else if (level < 900) {

            setBackground("bg-red-700")
        } else {

            setBackground("bg-amber-500 shadow-[0_5px_10px_rgb(252,_211,_77)]")
        }
    }

    return (

        <Card
            onClick={() => setIsClicked(!isClicked)}
            className={twMerge(
                "w-[256px] h-[400px] flex flex-col justify-between p-3 gap-2 overflow-hidden relative z-0",
                background,
                className
            )}
        >
            <Image
                src={imageURL}
                width={300}
                height={300}
                alt="card image"
                className="w-full h-3/4 rounded-md"
            />

            <div
                className="absolute bg-white text-black px-1 flex items-center justify-center rounded-sm border italic font-bold top-1 right-1"
            >
                {level}
            </div>

            <CardContent
                className="bg-zinc-50 h-1/4 w-full flex flex-col justify-center items-start"
            >
                <h1
                    className="capitalize text-black text-xl mt-2 text-ellipsis"
                >
                    {name}
                </h1>

                <CardDescription>
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}
