import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Header } from '../components/Header';

export const Home = (props) => {
    return (
        <>
            <Header navigation={props.navigation} />
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                colors={['#3b5998', '#192f6a']}
                style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text>HOME</Text>
                </View>
            </LinearGradient>
        </>
    )
}