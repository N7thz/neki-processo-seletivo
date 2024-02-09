import React, { FC, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardSkillProps, Market } from '@/types'
import { useService } from '@/api'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

export const ButtonAddMarket: FC<CardSkillProps> = ({ skill }) => {

    const { addToMarket } = useService()
    const router = useRouter()

    const [price, setPrice] = useState<number>()
    const [isError, setIsError] = useState<boolean>(false)

    const border = isError ? "border border-red-500" : ""

    const handleAddMarket = () => {

        if (
            price !== undefined && price !== 0
        ) {

            setIsError(false)

            const { id } = skill

            const market: Market = {

                skill: {
                    id
                },
                price
            }

            addToMarket(market)
                .then(() => {

                    router.push("/market")
                })
                .catch(err => console.log(err))
        } else {

            setIsError(true)
        }
    }

    return (

        <Dialog>
            <DialogTrigger asChild>

                <Button
                    variant="ghost"
                >
                    <ShoppingCart
                        size={20}
                    />
                </Button>
            </DialogTrigger>

            <DialogContent
                className="sm:max-w-[425px]"
            >
                <div
                    className="flex flex-col items-center justify-start gap-4 p-2 m-2"
                >
                    <Label
                        htmlFor="price"
                        className='w-full pl-1 text-md'
                    >
                        Escolha o preço da skill:
                    </Label>
                    <Input
                        id="price"
                        type='number'
                        min={10}
                        onChange={e => setPrice(Number(e.target.value))}
                        className={border}
                    />
                    {
                        isError &&
                        <span
                            className='text-red-500 text-md italic mt-1 lowercase'
                        >
                            O preço da skill é obrigatória
                        </span>
                    }
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleAddMarket}
                        className='flex items-center justify-center gap-2'
                    >
                        <ShoppingCart
                            size={16}
                        />
                        Add to market
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
