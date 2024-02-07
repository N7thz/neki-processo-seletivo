import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";

import { MarketResponse, UserResponse } from "../../@types";
import { Form } from "../../components/Form";
import { useService } from "../../api";

import { FontAwesome6, AntDesign } from '@expo/vector-icons';

export default function Market() {

    const { getMarketItens } = useService()

    const [user, setUser] = useState<UserResponse>()
    const [markets, setMarkets] = useState<MarketResponse[]>()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {

        getMarketItens()
            .then(res => { setMarkets(res.data) })
            .catch(err => console.log(err))

    }, [])

    return (

        <>
            <View style={styles.container}>

                <View style={styles.header}>

                    <Text style={styles.headerText}>
                        {user?.userName}
                    </Text>

                    <View style={styles.iconBox}>
                        <Text
                            style={{ fontSize: 24 }}
                        >
                            {user?.coins}
                        </Text>
                        <FontAwesome6
                            name="coins"
                            size={24}
                            color="yellow"
                        />
                    </View>
                </View>

                <View
                    style={styles.viewPrincipal}
                >

                    <View
                        style={styles.inputBox}
                    >
                        <TextInput
                            style={styles.input}
                        />
                        <AntDesign
                            style={styles.icon}
                            name="search1"
                            size={24}
                            color="black"
                        />
                    </View>

                    <ScrollView
                        style={{ width: "100%" }}
                    >
                        <View
                            style={styles.centerBox}
                        >
                            {
                                markets?.length == 0 &&
                                <Text
                                    style={styles.message}
                                >
                                    Você ainda não possui skills
                                </Text>
                            }

                            {
                                markets?.map(market =>
                                    <Text>{market.price}</Text>
                                )
                            }
                        </View>
                    </ScrollView>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setIsOpen(true)}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Adicionar Skill
                    </Text>
                </TouchableOpacity>
            </View>

            {
                isOpen && user !== undefined &&
                <Form
                    user={user}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            }
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
        width: "100%",
        backgroundColor: "#6366f1",
        padding: 2
    },

    headerText: {

        marginHorizontal: 24,
        marginTop: 6,
        textTransform: "capitalize",
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
        backgroundColor: "black",
        zIndex: 1
    },

    input: {

        width: "100%",
        position: "relative",
        fontSize: 18,
        backgroundColor: "#f2f2f2e9",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 4,
        padding: 4
    },

    message: {

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