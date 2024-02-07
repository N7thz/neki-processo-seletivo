import { FC, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { MarketResponse, UserResponse } from "../@types";
import { Entypo } from '@expo/vector-icons';
import { useRouter } from "expo-router"
import { Modal } from "./Modal";
import { useService } from "../api";
import { getDataJson } from "../util";

interface CardMarketOptionsProps {

    market: MarketResponse
}

export const CardMarketOptions: FC<CardMarketOptionsProps> = ({
    market
}) => {

    const { buySkill } = useService()

    const router = useRouter()

    useEffect(() => {
        getMySkills()
    }, [])

    const getMySkills = async () => {

        const storage: UserResponse = await getDataJson("userLogado")

        if (storage !== null) {

            setUser(storage)
        }
    }

    const [user, setUser] = useState<UserResponse>()
    const [isMarket, setIsMarket] = useState<boolean>(false)

    const handleBuySkill = async () => {

        buySkill(market.id).then(() => {

            alert("skill comprada com sucesso")
            router.push("/home")
        })
    }

    return (

        <>
            <View
                style={styles.container}
            >
                <Entypo
                    onPress={() => {
                        setIsMarket(!isMarket)
                    }}
                    name="shopping-cart"
                    size={24}
                    color="#2e1065"
                />
            </View>

            {
                isMarket &&
                <Modal
                    cancel={() => setIsMarket(false)}
                    confirm={handleBuySkill}
                >
                    {`A skill custa ${market.price}.`}
                    "Tem certeza que deseja comprar a skill?"
                </Modal>
            }
        </>
    )
}

export const styles = StyleSheet.create({

    container: {

        flexDirection: "row",
        width: "100%",
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "#f2f2f2",
        borderRadius: 12,
        borderColor: "#2e1065",
        borderWidth: 2,
        zIndex: 10
    },

    box: {

        width: "100%",
        backgroundColor: "#f2f2f2e9",
        borderRadius: 12,
        borderColor: "#2e1065",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        zIndex: 1
    },

    button: {

        width: "60%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#9333ea",
        padding: 12,
        borderRadius: 4
    },

    buttonText: {

        fontSize: 20,
        color: "#fff"
    },
});
