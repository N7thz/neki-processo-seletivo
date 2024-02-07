import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { View, Text, StyleSheet, ViewProps, TextInput, TouchableOpacity } from "react-native"
import { SkillResponse, UserResponse } from "../@types";
import { Entypo } from '@expo/vector-icons';
import { useRouter } from "expo-router"
import { Modal } from "./Modal";
import { useService } from "../api";
import { FormUpdate } from "./FormUpdate";
import { getDataJson } from "../util";

interface CardOptionsProps {

    skill: SkillResponse
}

export const CardOptions: FC<CardOptionsProps> = ({ skill }) => {

    const { deleteSkill, addToMarket } = useService()

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
    const [isTrash, setIsTrash] = useState<boolean>(false)
    const [isPencil, setIsPencil] = useState<boolean>(false)
    const [isMarket, setIsMarket] = useState<boolean>(false)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const [price, setPrice] = useState<string>('')

    const handleDeleteSkill = async () => {

        await deleteSkill(skill.id)
            .then(() => {

                alert('A skill foi excluida.')
                setIsTrash(false)
            })
            .catch(err => console.log(err))
    }

    const handleAddtoMarket = async () => {

        const market = {

            skill: {
                id: skill.id
            },
            price: Number(price)
        }

        addToMarket(market)
            .then(() => {
                alert("Adicionada ao mercado com sucesso")
                router.push("/market")
            })
            .catch(err => console.log(err))
    }

    return (

        <>
            <View
                style={styles.container}
            >
                <Entypo
                    onPress={() => {
                        setIsTrash(!isTrash)
                        setIsPencil(false)
                        setIsMarket(false)
                    }}
                    name="trash"
                    size={24}
                    color="#2e1065"
                />

                <Entypo
                    onPress={() => {
                        setIsTrash(false)
                        setIsPencil(!isPencil)
                        setIsMarket(false)
                    }}
                    name="pencil"
                    size={24}
                    color="#2e1065"
                />

                <Entypo
                    onPress={() => {
                        setIsTrash(false)
                        setIsPencil(false)
                        setIsMarket(!isMarket)
                    }}
                    name="shopping-cart"
                    size={24}
                    color="#2e1065"
                />
            </View>
            {
                isTrash &&
                <Modal
                    cancel={() => setIsTrash(false)}
                    confirm={handleDeleteSkill}
                >
                    "Tem certeza que deseja excluir a skill?"
                </Modal>
            }
            {
                isPencil &&
                <Modal
                    cancel={() => setIsPencil(false)}
                    confirm={() => {
                        setIsFormOpen(true)
                        setIsPencil(false)
                    }}
                >
                    "Tem certeza que deseja alterar a skill?"
                </Modal>
            }
            {
                isMarket &&
                <View
                    style={styles.box}
                >
                    <Text
                        style={{ fontSize: 24 }}
                    >
                        Escolha o preço da skill
                    </Text>

                    <TextInput
                        value={price}
                        onChangeText={setPrice}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleAddtoMarket}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            add ao mercado
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            {
                isFormOpen && user !== undefined &&
                <FormUpdate
                    isOpen={isFormOpen}
                    setIsOpen={setIsFormOpen}
                    user={user}
                    skill={skill}
                />
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

    input: {

        borderColor: "#000",
        fontSize: 18,
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 4,
        padding: 4,
        margin: 12
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
