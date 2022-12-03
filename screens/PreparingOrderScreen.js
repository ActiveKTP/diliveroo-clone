import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery");
        }, 3000)
    }, [])

    //const bgcolor = "[#0B1424],[#0E1E2F]";
    return (
        <SafeAreaView className="flex-1 bg-[#0E1E2F] justify-center items-center">
            <Animatable.Image
                //source={require("../assets/oderLoading4.gif")}
                source={require("../assets/oderLoading.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="h-96 w-96"
            />

            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-lg my-10 text-white font-bold text-center"
            >
                Waiting for Restaurant to accept your order!
            </Animatable.Text>

            <Progress.Circle size={60} indeterminate={true} color="white" />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen