import { FC, useEffect, useState } from "react"
import { AlertBox } from "./alert-box"
import { CardSkill } from "@/components/card-skill"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { MarketResponse } from "@/types"
import { useService } from "@/api"
import { useUser } from "@/context/user-context"
import { Check, XCircle, CircleDollarSign } from "lucide-react"

interface SkillsBoardProps {
    isLeft: boolean
}

export const SkillsBoard: FC<SkillsBoardProps> = ({ isLeft }) => {

    const { buySkill, getMarketItens } = useService()
    const { user } = useUser()

    const [market, setMarket] = useState<MarketResponse[] | null>(null)
    const [isRegister, setIsRegister] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const allmarketItems: MarketResponse[] | undefined = market?.filter(
        market => market.skill.idUser !== user?.id)

    const myMarketItems: MarketResponse[] | undefined = market?.filter(
        market => market.skill.idUser === user?.id
    )

    useEffect(() => {

        if (market == null) {

            getMarketItens()
                .then(res => setMarket(res.data))
                .catch(err => console.log(err))
        }

    }, [getMarketItens, market])

    const handleBuySkill = (market: MarketResponse) => {

        const id = market.id

        buySkill(id)
            .then(() => {

                setIsRegister(true)

                setTimeout(() => {

                    setIsRegister(false)
                    window.location.reload()

                }, 2000)
            })
            .catch(() => {

                setIsError(true)

                setTimeout(() => {

                    setIsError(false)
                }, 2000)
            })
    }

    return (

        <CardContent
            className="w-full flex flex-wrap justify-center gap-4 mt-12"
        >

            {
                (isLeft && allmarketItems?.length == 0) &&
                <span
                    className="flex items-center justify-center h-[200px] italic text-zinc-300"
                >
                    sem skills para comprar
                </span>
            }

            {
                (!isLeft && myMarketItems?.length == 0) &&
                <span
                    className="flex items-center justify-center h-[200px] italic text-zinc-300"
                >
                    você ainda não possui skills no mercado
                </span>
            }

            {
                isLeft
                    ? allmarketItems?.map(market => {

                        const { skill, price } = market

                        return (

                            <div
                                key={skill.id}
                                className="flex flex-col gap-4"
                            >
                                <CardSkill
                                    skill={skill}
                                />

                                <Card
                                    className="flex justify-between py-2 px-4 rounded-md border-violet-500"
                                >
                                    <CardTitle
                                        className="flex items-center gap-3 p-2 w-full"
                                    >
                                        {price}
                                        <CircleDollarSign
                                            color="yellow"
                                        />
                                    </CardTitle>
                                    <Button
                                        onClick={() => handleBuySkill(market)}
                                    >
                                        Comprar
                                    </Button>
                                </Card>
                            </div>
                        )
                    })
                    : myMarketItems?.map(market => {

                        const { skill, price } = market

                        return (

                            <div
                                key={skill.id}
                                className="flex flex-col gap-4"
                            >
                                <CardSkill
                                    skill={skill}
                                />
                                <Card
                                    className="flex justify-between py-2 px-4 rounded-md border-violet-500"
                                >
                                    <CardTitle
                                        className="flex items-center justify-center gap-3 p-2 w-full"
                                    >
                                        {price}
                                        <CircleDollarSign
                                            color="yellow"
                                        />
                                    </CardTitle>          
                                </Card>
                            </div>
                        )
                    })
            }
            {
                isRegister &&
                <AlertBox
                    className="text-green-500"
                    title="skill comprada!"
                    message="a skill foi comprado com sucesso"
                >
                    <Check />
                </AlertBox>
            }

            {
                isError &&
                <AlertBox
                    className="text-red-500"
                    title="error ao comprar"
                    message="não foi possivel comprar a skill"
                >
                    <XCircle />
                </AlertBox>
            }
        </CardContent>
    )
}
