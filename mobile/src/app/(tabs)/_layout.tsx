import { Tabs } from "expo-router";

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function TabRoutesLayout() {

    return (

        <Tabs
            screenOptions={{
                headerShown: false
            }}
        >
            <Tabs.Screen
                name="home"
                options={{

                    title: "",
                    tabBarIcon: ({ focused }) => focused
                        ? <Entypo
                            name="home"
                            size={28}
                            color="#8b5cf6"
                        />
                        : <AntDesign
                            name="home"
                            size={28}
                            color="#8b5cf6"
                        />
                }}
            />

            <Tabs.Screen
                name="market"
                options={{

                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused

                            ? <Entypo
                                name="shopping-cart"
                                size={28}
                                color="#8b5cf6"
                            />
                            : <AntDesign
                                name="shoppingcart"
                                size={28}
                                color="#8b5cf6"
                            />
                }}
            />
        </Tabs>
    )
}