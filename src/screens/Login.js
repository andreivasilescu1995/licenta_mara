import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';

import { styles } from '../style';
import api from '../api';

import AntIcon from "react-native-vector-icons/EvilIcons";
import Foundation from "react-native-vector-icons/Foundation";

export const Login = (props) => {
    const [username, setUsername] = React.useState('medic_ma');
    const [password, setPassword] = React.useState('1234');
    const [progress, setProgress] = React.useState(0);

    const checkLogin = () => {
        setProgress('loading');
        api.post('login', { username, password })
            .then(result => {
                console.log(result)
                if (result.data[0]) {
                    props.navigation.navigate('DrawerNav', { username: username, user_id: result.data[0], medic: result.data[1], avatar: require('../../assets/img/userLogged.svg') })
                }
                else
                    if (result.data == false)
                        alert('Nume sau parola gresite!');
            })
            .catch(error => {
                alert('Eroare autentificare: ', JSON.stringify(error.message));
            })
            .finally(() => {
                setProgress(0);
            })
    }

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

                {progress == 0 ?
                    <>
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

                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={
                                ['#3CDE87', '#C49C0F']
                            }
                            style={styles.loginButton}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => { checkLogin() }}>
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
                                onPress={() => { props.navigation.navigate('Register') }}>
                                <Text style={{ color: '#fff' }}>Inregistreaza-te</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate('DrawerNav') }}
                            style={{ position: 'absolute', bottom: 10, right: 10 }}>
                            <Text style={{ color: '#fff' }}>Ma autentific mai tarziu</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Progress.CircleSnail color={['red', 'green', 'blue']} size={70} />
                    </View>
                }
            </LinearGradient >
        </>
    )
}