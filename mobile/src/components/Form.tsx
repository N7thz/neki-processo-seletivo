import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"

import { Feather } from '@expo/vector-icons';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useService } from "../api";
import { SkillRequest, UserResponse } from "../@types";

export interface FormDataProps {

    name: string
    description: string
    imageURL: string
    level: number
}

const FormDataSchema = z.object({

    name: z.string().nonempty({
        message: "O nome da skill é obrigátorio."
    }),
    description: z.string().nonempty({
        message: "A description da skill é obrigátorio."
    }),
    imageURL: z.string().nonempty({
        message: "A imagem da skill é obrigátorio."
    }),
    level: z.string().min(1, {
            message: "O valor minimo é 1"
        })
})

interface FormProps {

    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    user: UserResponse
}

export const Form: FC<FormProps> = ({
    isOpen, setIsOpen, user: userLogado
}) => {

    const { createSkill } = useService()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({

        resolver: zodResolver(FormDataSchema)
    })

    const onSubmit = async (data: FormDataProps) => {

        const { name, description, imageURL, level } = data

        const skill: SkillRequest = {

            name,
            description,
            imageURL,
            level: Number(level),
            user: {
                id: userLogado.id
            }
        }

        await createSkill(skill)
            .then(() => {
                alert('Skill cadastrado com sucesso')
                setIsOpen(false)
            })
    }

    return (

        <View
            style={styles.container}
        >
            <View
                style={styles.form}
            >
                <Feather
                    style={styles.icon}
                    name="x"
                    size={32}
                    color="white"
                    onPress={() => setIsOpen(!isOpen)}
                />

                <Text style={styles.title}>
                    Adicionar skill
                </Text>

                <View style={styles.inputBox}>

                    <Text style={styles.label}>
                        name:
                    </Text>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange } }) => (

                            <TextInput
                                style={styles.input}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {
                        errors.name &&
                        <Text style={styles.inputError}>
                            {errors.name.message}
                        </Text>
                    }
                </View>

                <View style={styles.inputBox}>

                    <Text style={styles.label}>
                        descrição:
                    </Text>

                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange } }) => (

                            <TextInput
                                style={styles.input}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {
                        errors.description &&
                        <Text style={styles.inputError}>
                            {errors.description.message}
                        </Text>
                    }
                </View>

                <View style={styles.inputBox}>

                    <Text style={styles.label}>
                        imagem url:
                    </Text>

                    <Controller
                        control={control}
                        name="imageURL"
                        render={({ field: { onChange } }) => (

                            <TextInput
                                style={styles.input}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {
                        errors.imageURL &&
                        <Text style={styles.inputError}>
                            {errors.imageURL.message}
                        </Text>
                    }
                </View>

                <View style={styles.inputBox}>

                    <Text style={styles.label}>
                        level:
                    </Text>

                    <Controller
                        control={control}
                        name="level"
                        render={({ field: { onChange } }) => (

                            <TextInput
                                keyboardType="numeric"
                                maxLength={3}
                                style={styles.input}
                                onChangeText={onChange}
                            />
                        )}
                    />



                    {
                        errors.level &&
                        <Text style={styles.inputError}>
                            {errors.level.message}
                        </Text>
                    }
                </View>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>
                        Criar skill
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: '#000000b7',
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1
    },

    icon: {

        backgroundColor: "#2e1065",
        borderRadius: 999,
        padding: 2,
        borderColor: "red",
        borderWidth: 2,
        position: "absolute",
        top: -14,
        right: -14,
    },

    title: {

        fontSize: 32,
        marginTop: 30
    },

    form: {

        width: "80%",
        minHeight: 480,
        height: "50%",
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "#f2f2f2e9",
        borderRadius: 12,
        borderColor: "#2e1065",
        borderWidth: 2,
        position: "relative"
    },

    headerText: {

        marginHorizontal: 24,
        marginTop: 6,
        textTransform: "capitalize",
        fontSize: 24,
        fontWeight: "bold",
        fontStyle: "italic"
    },

    label: {

        fontSize: 20,
        marginVertical: 4,
        textTransform: "capitalize"
    },

    inputBox: {

        paddingHorizontal: 8,
        width: "90%",
        textAlign: "left"
    },

    input: {

        position: "relative",
        borderColor: "#000",
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 4,
        padding: 4
    },

    inputError: {

        color: "red",
        fontStyle: "italic",
        fontSize: 16,
        margin: 2
    },

    button: {

        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#2e1065",
        margin: 24,
        padding: 12,
        borderRadius: 4
    },

    buttonText: {

        fontSize: 20,
        color: "#fff"
    },
})


