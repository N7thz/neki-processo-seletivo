import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useService } from "../../api";
import { MarketResponse, UserResponse } from "../../@types";
import { CardMarket } from "../../components/CardMarket";
import { CardMarketOptions } from "../../components/CardMarketOptions";

export default function Market() {
    const { getMarketItens, getUserLogado } = useService();

    const [user, setUser] = useState<UserResponse>();
    const [markets, setMarkets] = useState<MarketResponse[]>([]);
    const [isLeft, setIsLeft] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const allMarkets: MarketResponse[] = markets?.filter(
        (market) => market.skill.idUser !== user?.id
    );
    const myMarkets: MarketResponse[] = markets?.filter(
        (market) => market.skill.idUser === user?.id
    );

    const fetchData = useCallback(async () => {
        try {
            const marketData = await getMarketItens();
            setMarkets(marketData.data);
            const userData = await getUserLogado();
            setUser(userData.data);
        } catch (error) {
            console.error("Erro ao buscar dados do mercado:", error);
        }
    }, [getMarketItens, getUserLogado]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [isLeft, fetchData]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => setIsLeft(!isLeft)}
                    style={styles.headerButton}
                >
                    <Text
                        style={[
                            styles.headerText,
                            isLeft && { color: "yellow" },
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
                            !isLeft && { color: "yellow" },
                        ]}
                    >
                        Todas as skills
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewPrincipal}>
                <ScrollView style={{ width: "100%" }}>
                    <View style={styles.centerBox}>
                        {isLeft
                            ? myMarkets?.map((market) => (
                                <CardMarket key={market.id} market={market} />
                            ))
                            : allMarkets?.map((market) => (
                                <View key={market.id}>
                                    <TouchableOpacity
                                        onPress={() => setIsOpen(!isOpen)}
                                    >
                                        <CardMarket market={market} />
                                    </TouchableOpacity>
                                    {isOpen && (
                                        <CardMarketOptions market={market} />
                                    )}
                                </View>
                            ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8b5cf6",
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
        borderRadius: 8,
    },
    headerButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 2,
    },
    headerText: {
        marginHorizontal: 12,
        marginTop: 6,
        textTransform: "capitalize",
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    viewPrincipal: {
        flex: 14,
        width: "92%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2bf",
        borderRadius: 8,
        marginTop: 28,
    },
    centerBox: {
        width: "100%",
        minHeight: 600,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 32,
        padding: 4,
    },
    button: {
        width: "80%",
        margin: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9333ea",
        padding: 12,
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
    },
});
