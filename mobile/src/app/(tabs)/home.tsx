import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { getDataJson } from "../../util";
import { SkillResponse, UserResponse } from "../../@types";
import { Form } from "../../components/Form";
import { useService } from "../../api";
import { Card } from "../../components/Card";

const Home = () => {
    const { getSkillByIdUser } = useService();

    const [user, setUser] = useState<UserResponse>();
    const [skills, setSkills] = useState<SkillResponse[]>();
    const [skillsFiltered, setSkillsFiltered] = useState<SkillResponse[]>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        try {
            const userData = await getDataJson("userLogado");
            setUser(userData);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (user) {
            getSkillByIdUser(user.id)
                .then((res) => {
                    setSkills(res.data);
                })
                .catch((err) => console.error("Erro ao buscar habilidades do usuário:", err));
        }
    }, [user, getSkillByIdUser]);

    useEffect(() => {
        if (skills) {
            setSkillsFiltered(skills.filter((skill) => skill.market === false));
        }
    }, [skills]);

    const handleOpenForm = () => {
        setIsOpen(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewPrincipal}>
                <ScrollView style={{ width: "100%" }}>
                    <View style={styles.centerBox}>
                        {skillsFiltered?.length === 0 && (
                            <Text style={styles.message}>Você ainda não possui skills</Text>
                        )}
                        {skillsFiltered?.map((skill) => (
                            <Card key={skill.id} skill={skill} />
                        ))}
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleOpenForm}>
                <Text style={styles.buttonText}>Adicionar Skill</Text>
            </TouchableOpacity>
            {isOpen && user !== undefined && (
                <Form user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8b5cf6",
        justifyContent: "space-between",
        alignItems: "center",
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
    message: {
        fontSize: 24,
        fontStyle: "italic",
        fontWeight: "bold",
        color: "#646262",
        margin: 12,
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

export default Home;
