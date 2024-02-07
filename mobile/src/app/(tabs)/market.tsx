import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import { MarketResponse, UserResponse } from "../../@types";
import { useService } from "../../api";

import { CardMarket } from "../../components/CardMarket";
import { CardMarketOptions } from "../../components/CardMarketOptions";

export default function Market() {

    const { getMarketItens, getUserLogado } = useService()

    const [user, setUser] = useState<UserResponse>()
    const [markets, setMarkets] = useState<MarketResponse[]>([])
    const [allMarkets, setAllMarkets] = useState<MarketResponse[]>([])
    const [myMarkets, setMyMarkets] = useState<MarketResponse[]>([])
    const [isLeft, setIsLeft] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {

        getMarketItens()
            .then(res => { setMarkets(res.data) })
            .catch(err => console.log(err))

        getUserLogado()
            .then(res => { setUser(res.data) })
            .catch(err => console.log(err))

        setAllMarkets(
            markets?.filter(
                market => market.skill.idUser !== user?.id
            )
        )
        setMyMarkets(
            markets?.filter(
                market => market.skill.idUser === user?.id
            )
        )

    }, [])

    useEffect(() => {

        getMarketItens()
            .then(res => { setMarkets(res.data) })
            .catch(err => console.log(err))

        setAllMarkets(
            markets?.filter(
                market => market.skill.idUser !== user?.id
            )
        )
        setMyMarkets(
            markets?.filter(
                market => market.skill.idUser === user?.id
            )
        )
    }, [isLeft])

    return (

        <>
            <View style={styles.container}>

                <View
                    style={styles.header}
                >

                    <TouchableOpacity
                        onPress={() => setIsLeft(!isLeft)}
                        style={styles.headerButton}
                    >
                        <Text
                            style={[
                                styles.headerText,
                                isLeft &&
                                { color: "yellow" }
                            ]}
                        >
                            Minhas Skill
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setIsLeft(!isLeft)}
                        style={styles.headerButton}
                    >
                        <Text
                            style={[
                                styles.headerText,
                                !isLeft &&
                                { color: "yellow" }
                            ]}
                        >
                            Todas as skills
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={styles.viewPrincipal}
                >
                    <ScrollView
                        style={{ width: "100%" }}
                    >
                        <View
                            style={styles.centerBox}
                        >
                            
                            {
                                isLeft
                                    ? myMarkets?.map(market =>

                                        <CardMarket
                                            key={market.id}
                                            market={market}
                                        />
                                    )
                                    : allMarkets?.map(market =>

                                        <View
                                            key={market.id}
                                        >
                                            <TouchableOpacity
                                                onPress={() => setIsOpen(!isOpen)}
                                            >
                                                <CardMarket
                                                    market={market}
                                                />
                                            </TouchableOpacity>
                                            {
                                                isOpen &&
                                                <CardMarketOptions
                                                    market={market}
                                                />
                                            }
                                        </View>
                                    )
                            }

                        </View>
                    </ScrollView>
                </View>
            </View >
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#8b5cf6',
        justifyContent: "space-between",
        alignItems: "center",
    },

    header: {

        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        backgroundColor: "#6366f1",
        padding: 2,
        margin: 12,
        borderRadius: 8
    },

    headerButton: {

        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 2
    },

    headerText: {

        marginHorizontal: 12,
        marginTop: 6,
        textTransform: "capitalize",
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        fontStyle: "italic"
    },

    viewPrincipal: {

        flex: 14,
        width: "92%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2bf",
        borderRadius: 8,
        marginTop: 28
    },

    inputBox: {

        flex: 1,
        width: "100%",
        justifyContent: "center",
        zIndex: 1
    },

    input: {

        width: "100%",
        position: "relative",
        fontSize: 18,
        backgroundColor: "#f2f2f2e9",
        borderWidth: 1,
        borderRadius: 4,
        padding: 4
    },

    message: {

        textAlign: "center",
        fontSize: 24,
        fontStyle: "italic",
        fontWeight: "bold",
        color: "#646262",
        margin: 12,
    },

    center: {

        justifyContent: "center",
        alignItems: "center",
        marginTop: 24
    },

    centerBox: {

        width: "100%",
        minHeight: 600,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 32,
        padding: 4
    },

    scrollView: {

        width: "100%",
        height: "100%",
    },

    box: {

        flex: 1,
        width: "80%",
        marginTop: 60,
        backgroundColor: "#f2f2f2e9",
        borderRadius: 12,
        borderColor: "#2e1065",
        borderWidth: 2,
    },

    iconBox: {

        width: "20%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginRight: 12
    },

    icon: {

        position: "absolute",
        right: "3%"
    },

    button: {

        width: "80%",
        margin: 24,
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