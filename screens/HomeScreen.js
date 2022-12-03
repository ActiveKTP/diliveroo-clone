import { View, Text, SafeAreaView, Image, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import GlobalStyles from '../GlobalStyles';
import {
    UserIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";

import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        sanityClient.fetch(
            `
                *[_type == "featured"] {
                        ...,
                    restaurant[]->{
                        ...,
                        dishes[]->
                    }
                }
            `
        ).then((data) => {
            setFeaturedCategories(data);
        });
    }, []);

    return (
        <SafeAreaView className="bg-white pt-5" style={GlobalStyles.droidSafeArea}>
            {/* Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    source={{
                        uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQGvLA7Vjfpxrw/profile-displayphoto-shrink_200_200/0/1609252888574?e=1673481600&v=beta&t=DaTz23tRMIrdYn8m5MK5HOzO1KAd6ij1E9Ko5dCdqUw',
                    }}
                />

                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>

                <UserIcon size={35} color="#00CCBB" />
            </View>

            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                    <MagnifyingGlassIcon color="gray" size={20} />
                    <TextInput
                        placehoder="Restaurants and cuisines"
                        keyboadType="default"
                    />
                </View>

                <AdjustmentsHorizontalIcon color="#00CCBB" />
            </View>

            {/* Body */}
            <ScrollView className="bg-gray-100">
                {/* Categories */}
                <Categories />

                {/* Featured Rows */}
                {featuredCategories?.map(category => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>

        </SafeAreaView>


    )
}

export default HomeScreen