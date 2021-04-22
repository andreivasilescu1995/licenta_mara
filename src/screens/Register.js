import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';

import { styles } from '../style';
import api from '../api';

import EvilIcons from "react-native-vector-icons/EvilIcons";
import FoundationIcons from "react-native-vector-icons/Foundation";
import EntypoIcons from 'react-native-vector-icons/Entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

export const Register = (props) => {
    const [username, setUsername] = React.useState('test1');
    const [password, setPassword] = React.useState('1234');
    const [name, setName] = React.useState('test1');
    const [email, setEmail] = React.useState('test1');
    const [cnp, setCnp] = React.useState('1234567891234');
    const [address, setAddress] = React.useState('test1');
    const [phoneNumber, setPhoneNumber] = React.useState('0737092953');
    const [birthdate, setBirthDate] = React.useState('1995-07-13');
    const [sex, setSex] = React.useState('m');

    const [progress, setProgress] = React.useState(0);
    const [warning, setWarning] = React.useState(null);
    const refScrollView = React.createRef();

    const register = () => {
        api.post('register', { name, username, password, email, cnp, address, phoneNumber, birthdate, sex })
            .then(result => {
                if (result.data == true) {
                    setProgress('succes');
                }
                else
                    if (result.data == false)
                        alert('Inregistrare esuata!');
            })
            .catch(error => {
                alert('Eroare inregistrare: ', JSON.stringify(error));
            })
    }

    const DoneRegistering = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <AntDesignIcons name={'check'} size={80} color={'green'} />
                <Text style={styles.doneRegistering}>Inregistrare cu succes!</Text>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={
                        ['#3CDE87', '#C49C0F']
                    }
                    style={[styles.loginButton, { marginTop: 30, marginBottom: 15 }]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => { props.navigation.navigate('Login') }}>
                        <Text style={{ fontSize: 13, fontFamily: 'OpenSans-Regular', color: '#fff', marginRight: 15 }}>Login</Text>
                        <AntDesignIcons name={'arrowright'} style={{ top: 2 }} color='#fff' />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }

    const WarningMessage = () => {
        return (
            warning != null &&
            <Animatable.View useNativeDriver={true} animation={warning != null ? 'bounceInLeft' : 'bounceOutRight'} style={[styles.warningMessage, { marginTop: 30, marginHorizontal: 10 }]}>
                <View style={[styles.warningMessage, { padding: 20 }]}>
                    <TouchableOpacity onPress={() => setWarning(null)}>
                        <EvilIcons name="close" color="white" size={20} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, fontFamily: 'OpenSans-Regular', marginLeft: 30, color: "white" }}>{warning}</Text>
                </View>
            </Animatable.View>
        )
    }

    const checkRegisterFields = () => {
        if (username != null && password != null && name != null && email != null && cnp != null && address != null && phoneNumber != null && birthdate != null && sex != null) {
            if (cnp.length != 13) {
                setWarning('CNP invalid');
                return false;
            }
            if (!email.includes('@')) {
                setWarning('Email invalid');
                return false;
            }
            if (phoneNumber.toString().substring(0, 2) != "07" || phoneNumber.toString().length < 10) {
                setWarning('Numar de telefon invalid');
                return false;
            }
            return true;
        }
        else {
            setWarning('Completati toate campurile!');
            return false;
        }
    }

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            colors={['#3b5998', '#192f6a']}
            style={[styles.container]}>

            <ScrollView ref={refScrollView} contentContainerStyle={{ alignItems: 'center' }}>
                <Image source={require('../../assets/img/logo.png')} style={styles.logo} />

                <TouchableOpacity
                    style={{ position: 'absolute', top: 15, left: 15 }}
                    onPress={() => {
                        if (progress > 0 && progress != 'done')
                            setProgress(progress - 1);
                        else
                            props.navigation.goBack()
                    }}>
                    <EntypoIcons name={'chevron-left'} color='#fff' size={30} />
                </TouchableOpacity>

                {progress != 'done' ?
                    <>
                        {progress == 0 &&
                            <Animatable.View useNativeDriver={true} animation={progress == 0 ? 'fadeInLeft' : 'fadeOutRight'} style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.viewInput}>
                                    <TextInput
                                        placeholder={'Nume'}
                                        placeholderTextColor={'#fff'}
                                        autoCompleteType={'username'}
                                        style={styles.textInput}
                                        value={username}
                                        onChangeText={text => setUsername(text)}
                                    />
                                    <EvilIcons style={{ position: 'absolute', left: 8 }} name="user" color="white" size={30} />
                                </View>

                                <View style={[styles.viewInput, { marginTop: 30 }]}>
                                    <TextInput
                                        placeholder={'Parola'}
                                        placeholderTextColor={'#fff'}
                                        autoCompleteType={'password'}
                                        secureTextEntry={true}
                                        style={styles.textInput}
                                        onChangeText={text => setPassword(text)}
                                        value={password}
                                    />
                                    <FoundationIcons style={{ position: 'absolute', left: 12 }} name="key" color="white" size={20} />
                                </View>
                            </Animatable.View>
                        }

                        {progress == 1 &&
                            <Animatable.View useNativeDriver={true} animation={progress == 1 ? 'fadeInLeft' : 'fadeOutRight'} style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.viewInput}>
                                    <TextInput
                                        placeholder={'Nume'}
                                        placeholderTextColor={'#fff'}
                                        style={styles.textInput}
                                        value={name}
                                        onChangeText={text => setName(text)}
                                    />
                                    <EvilIcons style={{ position: 'absolute', left: 8 }} name="user" color="white" size={30} />
                                </View>

                                <View style={[styles.viewInput, { marginTop: 20 }]}>
                                    <TextInput
                                        placeholder={'Email'}
                                        placeholderTextColor={'#fff'}
                                        style={styles.textInput}
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                    />
                                    <EntypoIcons style={{ position: 'absolute', left: 8 }} name="email" color="white" size={20} />
                                </View>

                                <View style={[styles.viewInput, { marginTop: 20 }]}>
                                    <TextInput
                                        placeholder={'cnp'}
                                        placeholderTextColor={'#fff'}
                                        style={styles.textInput}
                                        value={cnp}
                                        onChangeText={text => setCnp(text)}
                                        keyboardType={'number-pad'}
                                    />
                                    <FontAwesomeIcons style={{ position: 'absolute', left: 8 }} name="id-card" color="white" size={20} />
                                </View>

                                <View style={[styles.viewInput, { marginTop: 20 }]}>
                                    <TextInput
                                        placeholder={'Adresa'}
                                        placeholderTextColor={'#fff'}
                                        multiline={true}
                                        autoCompleteType={'street-address'}
                                        style={styles.textInput}
                                        onChangeText={text => setAddress(text)}
                                        value={address}
                                    />
                                    <EntypoIcons style={{ position: 'absolute', left: 12 }} name="address" color="white" size={20} />
                                </View>

                                <View style={[styles.viewInput, { marginTop: 20 }]}>
                                    <TextInput
                                        placeholder={'Telefon'}
                                        placeholderTextColor={'#fff'}
                                        autoCompleteType={'tel'}
                                        style={styles.textInput}
                                        onChangeText={text => setPhoneNumber(text)}
                                        value={phoneNumber}
                                        keyboardType={'phone-pad'}
                                    />
                                    <EntypoIcons style={{ position: 'absolute', left: 12 }} name="old-phone" color="white" size={20} />
                                </View>

                                <DatePicker
                                    style={{ marginTop: 20, height: 50, width: '80%', borderWidth: 1, borderRadius: 20, borderColor: '#fff', padding: 5 }}
                                    date={birthdate}
                                    mode="date"
                                    placeholder={birthdate ? birthdate : 'Selecteaza data nasterii'}
                                    placeholderTextColor={'#fff'}
                                    format="DD-MM-YYYY"
                                    minDate="2016-05-01"
                                    maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            width: 25,
                                            height: 25,
                                            left: 1,
                                            top: 6,
                                            marginLeft: 2
                                        },
                                        dateInput: {
                                            marginLeft: -5,
                                            borderRadius: 20,
                                            borderWidth: 0,
                                            top: -2
                                        },
                                        dateText: {
                                            color: '#fff'
                                        }
                                    }}
                                    onDateChange={(date) => { setBirthDate(date) }}
                                />

                                <View style={[styles.inputView, { width: '80%', height: 50, paddingHorizontal: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 20, marginTop: 20 }]}>
                                    <View style={{ position: 'absolute', top: 10, left: 10 }}>
                                        <FontAwesomeIcons name={'intersex'} size={25} color={'#fff'} />
                                    </View>
                                    <Picker
                                        selectedValue={sex}
                                        style={{ flex: 1, marginLeft: 35, color: '#fff', backgroundColor: 'transparent' }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSex(itemValue)
                                        }>
                                        <Picker.Item label="Masculin" value="m" />
                                        <Picker.Item label="Feminin" value="f" />
                                    </Picker>
                                    <View
                                        style={{ position: 'absolute', right: 10, top: 17 }}
                                        onPress={() => { }}>
                                        <AntDesignIcons name={'caretdown'} fontSize={20} color={'#fff'} />
                                    </View>
                                </View>
                            </Animatable.View>
                        }
                    </>
                    :
                    progress == 'succes' ?
                        null
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Progress.CircleSnail color={['red', 'green', 'blue']} size={70} />
                        </View>}

                {warning != null ?
                    <WarningMessage />
                    :
                    null
                }

                {progress != 'succes' ?
                    progress != 'done' ?
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={
                                ['#3CDE87', '#C49C0F']
                            }
                            style={[styles.loginButton, { marginTop: 30, marginBottom: 15 }]}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    if (progress == 1) {
                                        if (checkRegisterFields()) {
                                            register()
                                            setWarning(null)
                                        }
                                    }
                                    else
                                        setProgress(progress + 1)
                                }}>
                                <Text style={{ color: '#fff', marginRight: 15 }}>{progress == 1 ? 'Finalizeaza' : 'Mai departe'}</Text>
                                <AntDesignIcons name={'arrowright'} style={{ top: 2 }} color='#fff' />
                            </TouchableOpacity>
                        </LinearGradient>
                        :
                        null
                    :
                    <DoneRegistering />
                }
            </ScrollView>
        </LinearGradient >
    )
}