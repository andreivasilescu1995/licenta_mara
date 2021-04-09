import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../style';

import ModalNewAppointment from './ModalNewAppointment';
import { Header } from '../../components/Header';

import Icon from "react-native-vector-icons/Entypo";

export default class Appointments extends React.Component {
    constructor(props) {
        super();
        this.state = {
            logged: props.logged,
        };
        this.refModalApp = React.createRef();
    }

    render() {
        return (
            <>
                <Header navigation={this.props.navigation} />
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#3b5998', '#192f6a']}
                    style={{ flex: 1, alignItems: 'center' }}>

                    {this.props.logged ?
                        null
                        :
                        <>
                            <ModalNewAppointment ref={this.refModalApp} />
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', marginTop: '5%', marginBottom: 10 }}>Programari rapide</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (this.state.logged)
                                            this.refModalApp.current.toggleModal();
                                        else
                                            Alert.alert('Atentie', 'Aceasta sectiune este disponibila doar utilizatorilor inregistrati. Va rugam sa alegeti una din optiunile de mai jos.',
                                                [
                                                    {
                                                        text: 'Autentificare',
                                                        onPress: () => this.props.navigation.navigate('Login')
                                                    },
                                                    {
                                                        text: 'Inregistrare',
                                                        onPress: () => this.props.navigation.navigate('Register')
                                                    },

                                                ],
                                                { cancelable: true }
                                            )
                                    }}
                                    style={{}}>
                                    <Icon name={'circle-with-plus'} color='#fff' size={35} />
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </LinearGradient>
            </>
        )
    }
}