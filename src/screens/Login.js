import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import * as Progress from 'react-native-progress';

import { styles } from '../style';
import api from '../api';

import AntIcon from "react-native-vector-icons/EvilIcons";
import Foundation from "react-native-vector-icons/Foundation";

export const Login = (props) => {
    const [username, setUsername] = React.useState('medic_ma');
    const [password, setPassword] = React.useState('1234');
    const [progress, setProgress] = React.useState(0);
    const [qr, setQr] = React.useState(false);

    const checkLogin = (user, pwd) => {
        setProgress('loading');
        api.post('login', { user, pwd })
            .then(result => {
                // console.log('RESPONSE LOGIN: ', result)
                if (result.data[0]) {
                    if (result.data[1] != 0) {
                        props.navigation.navigate('DrawerNav', {
                            screen: 'Appointments',
                            creditentials: { username: user, user_id: result.data[0], medic: result.data[1] }
                        })
                    }
                    else {
                        props.navigation.navigate('DrawerNav', {
                            screen: 'Servicies',
                            creditentials: { username: user, user_id: result.data[0], medic: result.data[1] }
                        })
                    }
                }
                else
                    if (result.data == false)
                        alert('Nume sau parola gresite!');
            })
            .catch(error => {
                console.error(error);
                // alert('Eroare autentificare: ', JSON.stringify(error.message));
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
                        <Image style={styles.logo} source={require('../../assets/img/logo.png')} />

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
                                onPress={() => { checkLogin(username, password) }}>
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
                                onPress={() => { setQr(true); setProgress('qr') }}>
                                <Text style={{ color: '#fff' }}>QR Login</Text>
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
                    progress == 'qr' ?
                        <QRCodeScanner
                            showMarker={true}
                            onRead={data => {
                                // console.log('DATA QR: ', JSON.parse(data.data))
                                let user = JSON.parse(data.data);
                                checkLogin(user.username, user.password);
                            }}
                            flashMode={RNCamera.Constants.FlashMode.auto}
                            topContent={<Text style={{ color: '#fff', paddingHorizontal: 20, paddingVertical: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 20, marginBottom: 10 }}>Scanati codul pentru autentificare</Text>}
                            bottomContent={<TouchableOpacity onPress={() => { setProgress(0) }}><Text style={{ color: '#fff', paddingHorizontal: 20, paddingVertical: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 20, marginTop: 10 }}>Inapoi</Text></TouchableOpacity>}
                        />
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Progress.CircleSnail color={['red', 'green', 'blue']} size={70} />
                        </View>
                }
            </LinearGradient >
        </>
    )
}