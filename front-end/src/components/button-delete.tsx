import React, { FC } from 'react'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from 'lucide-react'
import { CardSkillProps } from '@/types'
import { useService } from '@/api'

export const ButtonDelete: FC<CardSkillProps> = ({ skill }) => {

    const { deleteSkill } = useService()

    const handleDeleteSkill = () => {

        const id = skill.id

        deleteSkill(id)
            .then(() => window.location.reload())
            .catch(err => console.log(err))
    }

    return (

        <Dialog>
            <DialogTrigger asChild>

                <Button
                    variant="ghost"
                >
                    <Trash2
                        size={20}
                    />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] border-2 border-violet-500">
                <DialogTitle
                    className='text-2xl p-4'
                >
                    Tem certeza que deseja excuir a skill
                    <span
                        className='italic capitalize'
                    >
                        {` "${skill.name}"`}
                    </span>?
                </DialogTitle>

                <DialogFooter>
                    <Button
                        onClick={handleDeleteSkill}
                        className='flex items-center justify-center gap-2'
                    >
                        <Trash2
                            size={16}
                        />
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
