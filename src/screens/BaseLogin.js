import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StatusBar, Switch, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { styles } from '../style';

import AntIcon from "react-native-vector-icons/EvilIcons";
import Foundation from "react-native-vector-icons/Foundation";

export const BaseLogin = (props) => {
    const [username, setUsername] = React.useState('admin');
    const [password, setPassword] = React.useState('admin');
    const [switchMedic, setSwitchMedic] = React.useState(false);

    return (
        <>
            {props.navigation.dangerouslyGetState().index == 0 ?
                <StatusBar backgroundColor={'#3b5998'} animated barStyle={'white-content'} />
                :
                null
            }
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                colors={['#3b5998', '#192f6a']}
                style={[styles.container, { alignItems: 'center' }]}>

                <Text style={styles.logo}>LOGO + mesaj de bun venit</Text>

                <View style={styles.viewInput}>
                    <TextInput
                        autoCompleteType={'username'}
                        style={styles.textInput}
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    <AntIcon style={{ position: 'absolute', left: 8 }} name="user" color="white" size={30} />
                </View>

                <View style={[styles.viewInput, { marginTop: 30 }]}>
                    <TextInput
                        autoCompleteType={'password'}
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                    <Foundation style={{ position: 'absolute', left: 12 }} name="key" color="white" size={20} />
                </View>

                <View style={[styles.row, { alignItems: 'center', alignSelf: 'flex-start', paddingLeft: 35, paddingTop: 20 }]}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={switchMedic ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => { console.log(value); setSwitchMedic(switchMedic => !switchMedic) }}
                        value={switchMedic}
                    />
                    <Text style={{ marginLeft: 10, color: switchMedic ? '#f5dd4b' : '#fff' }}>{switchMedic ? 'Medic' : 'Pacient'}</Text>
                </View>

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={
                        ['#3CDE87', '#C49C0F']
                    }
                    style={styles.loginButton}>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => { }}>
                        <Text style={{ color: '#fff' }}>Autentificare</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={
                        ['#3CDE87', '#C49C0F']
                    }
                    style={[styles.loginButton, { paddingHorizontal: 20, marginTop: 20 }]}>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => { }}>
                        <Text style={{ color: '#fff' }}>Inregistreaza-te</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <TouchableOpacity
                    onPress={() => { props.navigation.navigate('UnregisteredDrawerNav') }}
                    style={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <Text style={{ color: '#fff' }}>Ma autentific mai tarziu</Text>
                </TouchableOpacity>
            </LinearGradient >
        </>
    )
}