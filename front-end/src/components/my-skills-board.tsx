import { Card, CardContent } from "@/components/ui/card"
import { ButtonAddMarket } from "@/components/button-add-market"
import { ButtonDelete } from "@/components/button-delete"
import { ButtonUpdate } from "@/components/button-update"
import { CardSkill } from "@/components/card-skill"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/context/user-context"

export const MySkillsBoard = () => {

    const { user } = useUser()

    if (user) {

        const { skills } = user
        const mySkills = skills.filter(skill => skill.market == false)

        return (

            <CardContent
                className="w-full flex flex-wrap justify-center gap-4 mt-16"
            >

                {mySkills.length == 0
                    ? <span className="italic text-zinc-300">
                        você ainda não possui skills
                    </span>
                    : mySkills.map(skill =>

                        <DropdownMenu
                            key={skill.id}
                        >
                            <DropdownMenuTrigger asChild>

                                <div>
                                    <CardSkill
                                        skill={skill}
                                        className=" cursor-pointer hover:scale-95 duration-200"
                                    />
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-56 z-10"
                            >
                                <Card
                                    className="w-full flex justify-around items-center p-1 gap-2 border border-violet-500 absolute -top-12"
                                >
                                    <ButtonDelete
                                        skill={skill}
                                    />

                                    <ButtonUpdate
                                        skill={skill}
                                    />

                                    <ButtonAddMarket
                                        skill={skill}
                                    />
                                </Card>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
            </CardContent>
        )
    }
}

