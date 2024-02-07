import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormDataProps } from "../app";

export const storeDataJson = async (key: string, value: FormDataProps) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) { }
};

export const storeData = async (key: string, value: string,) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) { }
};

export const getDataJson = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) { }
};

export const getData = async (key: string) => {
    try {

        const value = await AsyncStorage.getItem(key);

        if (value !== null) {

            return value
        }
    } catch (e) { }
};