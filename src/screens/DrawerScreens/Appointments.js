import React from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ModalNewAppointment from './ModalNewAppointment';
import { Header } from '../../components/Header';
import api from '../../api';

import Icon from "react-native-vector-icons/Entypo";

export default class Appointments extends React.Component {
    constructor(props) {
        super();
        this.state = {
            logged: props?.route?.params?.logged,
            appointments: [],
        };
        this.refModalApp = React.createRef();

        console.log('PROPS PROGRAMARI: ', props);
    }

    componentDidMount() {
        if (this.props.route.params.user_id)
            api.post('getConsultations', { id_pacient: this.props.route.params.user_id })
                .then(response => {
                    console.log('programari: ', response.data);
                    this.setState({ appointments: response.data, loading: false });
                })
                .finally(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <>
                <Header navigation={this.props.navigation} />
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#3b5998', '#192f6a']}
                    style={{ flex: 1, alignItems: 'center' }}>

                    {this.props.route.params.logged === true ?
                        <>
                            <ModalNewAppointment ref={this.refModalApp} />
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <ScrollView>
                                    {this.state.appointments.map((appointment, index) => {
                                        console.log('programare: ', appointment)
                                        appointment.data = new Date(appointment.data)
                                        return (
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: '#fff' }}>{appointment.tip_consultatie}</Text>
                                                <Text style={{ color: '#fff' }}> {appointment.data.getDate()} / {appointment.data.getMonth()} / {appointment.data.getFullYear()}</Text>
                                                <Text style={{ color: '#fff' }}> {appointment.nume_locatie}</Text>
                                                <Text style={{ color: '#fff' }}> {appointment.nume_medic}</Text>
                                            </View>
                                        )
                                    })}
                                </ScrollView>
                                <Text style={{ color: '#fff', marginTop: '5%', marginBottom: 10 }}>Adauga programare</Text>
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
                                    style={{ marginBottom: 20 }}>
                                    <Icon name={'circle-with-plus'} color='#fff' size={35} />
                                </TouchableOpacity>
                            </View>
                        </>
                        :
                        <>
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
                        </>
                    }
                </LinearGradient>
            </>
        )
    }
}