import React from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ModalNewAppointment from './ModalNewAppointment';
import Header from '../../components/Header';
import api from '../../api';

import Icon from "react-native-vector-icons/Entypo";

export default class Appointments extends React.Component {
    constructor(props) {
        super();
        this.state = {
            logged: props.creditentials ? true : false,
            appointments: [],
        }
        this.refModalApp = React.createRef();

        console.log('PROPS PROGRAMARI: ', props);
    }

    componentDidMount() {
        if (this.state.logged && this.props.creditentials?.user_id)
            this.getConsultations();
    }

    getConsultations() {
        if (this.props.creditentials.medic && this.props.creditentials.medic !== 0) {
            api.post('getMedicConsultations', { id_user: this.props.creditentials.user_id })
                .then(response => {
                    // console.log('programari: ', response.data);
                    this.setState({ appointments: response.data, loading: false });
                })
                .finally(() => this.setState({ loading: false }));
        }
        else {
            api.post('getConsultations', { id_pacient: this.props.creditentials.user_id })
                .then(response => {
                    // console.log('programari: ', response.data);
                    this.setState({ appointments: response.data, loading: false });
                })
                .finally(() => this.setState({ loading: false }));
        }
    }

    refreshConsultations() {
        setTimeout(() => {
            this.setState({ loading: true });
            this.getConsultations();
        }, 3000);
    }

    render() {
        return (
            <>
                <Header navigation={this.props.navigation} title='Programari' />
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#3b5998', '#192f6a']}
                    style={{ flex: 1, padding: 10 }}>

                    {this.state.logged ?
                        this.props.creditentials?.medic != 0 ?
                            <ScrollView>
                                {this.state.appointments.map((appointment, index) => {
                                    appointment.data = new Date(appointment.data)
                                    return (
                                        <View key={index} style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.25)', padding: 10, borderRadius: 10, marginBottom: 10 }}>
                                            <Text style={{ fontWeight: 'bold', color: '#fff', textTransform: 'uppercase' }}>{appointment.tip_consultatie}</Text>
                                            <Text style={{ color: '#fff' }}><Text style={{ fontWeight: 'bold' }}>Locatie: </Text>{appointment.nume_locatie}</Text>
                                            <Text style={{ color: '#fff' }}><Text style={{ fontWeight: 'bold' }}>Data: </Text>{appointment.data.getDate()}/{appointment.data.getMonth()}/{appointment.data.getFullYear()}</Text>
                                            <Text style={{ color: '#fff' }}><Text style={{ fontWeight: 'bold' }}>Pacient: </Text> {appointment.nume_pacient}</Text>
                                            <Text style={{ color: '#fff' }}><Text style={{ fontWeight: 'bold' }}>Procedura: </Text> {appointment.nume_subserviciu}</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                            :
                            <>
                                <ModalNewAppointment ref={this.refModalApp} onRefresh={() => { this.refreshConsultations() }} user_id={this.props.creditentials.user_id} />
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <ScrollView>
                                        {this.state.appointments.map((appointment, index) => {
                                            appointment.data = new Date(appointment.data)
                                            return (
                                                <View key={index} style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.25)', padding: 10, borderRadius: 10, marginBottom: 10 }}>
                                                    <Text style={{ fontWeight: 'bold', color: '#fff', textTransform: 'uppercase' }}>{appointment.tip_consultatie}</Text>
                                                    <Text style={{ color: '#fff' }}><Text style={{ fontWeight: 'bold' }}>Locatie: </Text>{appointment.nume_locatie}</Text>
                                                    <Text style={{ color: '#fff' }}><Text style={{ fontWeight: 'bold' }}>Data: </Text>{appointment.data.getDate()}/{appointment.data.getMonth()}/{appointment.data.getFullYear()}</Text>
                                                    <Text style={{ color: '#fff' }}><Text style={{ fontWeight: 'bold' }}>Medic: </Text> {appointment.nume_medic}</Text>
                                                    <Text style={{ color: '#fff' }}><Text style={{ fontWeight: 'bold' }}>Procedura: </Text> {appointment.nume_subserviciu}</Text>
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
                    }
                </LinearGradient>
            </>
        )
    }
}