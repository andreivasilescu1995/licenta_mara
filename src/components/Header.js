import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

import EvilIcons from "react-native-vector-icons/EvilIcons";

export const Header = (props) => {
    return (
        <>
            <StatusBar backgroundColor={'#2A52BE'} animated />
            <View style={{ width: '100%', height: 50, backgroundColor: '#2A52BE', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={() => { props.navigation.toggleDrawer() }}>
                    <EvilIcons style={{}} name="navicon" color="white" size={30} />
                </TouchableOpacity>
            </View>
        </>
    )
}