import React, { FC, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PenLine } from 'lucide-react'
import { FormUpdateSkill } from './form-update-skill'
import { CardSkillProps } from '@/types'

export const ButtonUpdate: FC<CardSkillProps> = ({ skill }) => {

    return (

        <Dialog>
            <DialogTrigger asChild>

                <Button
                    variant="ghost"
                >
                    <PenLine
                        size={20}
                    />
                </Button>
            </DialogTrigger>

            <DialogContent
                className="sm:max-w-[425px] border border-violet-500"
            >
                <FormUpdateSkill 
                    skill={skill}
                />
            </DialogContent>
        </Dialog>
    )
}
