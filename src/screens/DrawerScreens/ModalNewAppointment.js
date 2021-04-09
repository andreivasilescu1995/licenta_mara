import React from 'react';
import { Modal, View, TouchableOpacity, TextInput, ActivityIndicator, Text } from 'react-native';
import { styles } from '../../style';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from "react-native-vector-icons/EvilIcons";

import api from '../../api';

export default class ModalNewAppointment extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            name: 'test',
            age: 20,
            email: 'test@test.com',
            phone: '1234',
            service: 'consultatie',
            location: null,
            timestamp: null,
            medic: null,

            loading: true,
            medics: null,
            location: null,
        }
    }

    componentDidMount() {
        this.getMedics();
        this.getLocations();
    }

    toggleModal = () => { this.setState({ showModal: !this.state.showModal }) };

    sendAppointment() {
        const data = this.state;
        api.post('createConsultation',
            {
                name: data.name,
                age: data.age,
                email: data.email,
                phone: data.phone,
                service: data.service,
                location_id: data.location.id,
                timestamp: data.timestamp,
                medic_id: data.medic.id,
            }
        )
            .then(response => {
                if (response.data)
                    alert('Programare creata cu succes')
                else
                    alert('A aparut o eroare')
            })
            .catch(error => { console.error(error); alert(JSON.stringify(error.message)) });
    }

    getMedics() {
        api.post('getMedics', {})
            .then(response => {
                // console.log('MEDICI: ', response);
                this.setState({ medics: response.data, medic: response.data[0], loading: false });
            })
            .finally(() => this.setState({ loading: false }));
    }

    getLocations() {
        api.post('getLocations', {})
            .then(response => {
                // console.log('Locatii: ', response);
                this.setState({ locations: response.data, location: response.data[0], loading: false });
            })
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        let servicies = ['consultatie', 'tratament'];

        return (
            <Modal
                animationType="slide"
                visible={this.state.showModal}
                transparent={true}
                onRequestClose={() => { this.toggleModal() }}>

                <TouchableOpacity
                    onPress={() => { this.toggleModal() }}
                    style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {this.state.loading ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={30} color={'#ffd101'} />
                        </View>
                        :
                        <View style={{ width: '100%', height: '80%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                            <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: '5%' }}>
                                <View style={styles.viewInput}>
                                    <TextInput
                                        placeholder={'Nume'}
                                        placeholderTextColor={'#fff'}
                                        autoCompleteType={'name'}
                                        style={styles.textInput}
                                        value={this.state.name}
                                        onChangeText={text => this.setState({ name: text })}
                                    />
                                    <EvilIcons style={{ position: 'absolute', left: 8 }} name="user" color="white" size={30} />
                                </View>

                                <View style={styles.viewInput}>
                                    <TextInput
                                        placeholder={'Varsta'}
                                        placeholderTextColor={'#fff'}
                                        style={styles.textInput}
                                        value={this.state.age}
                                        onChangeText={text => this.setState({ age: text })}
                                    />
                                    <EvilIcons style={{ position: 'absolute', left: 8 }} name="user" color="white" size={30} />
                                </View>

                                <View style={styles.viewInput}>
                                    <TextInput
                                        placeholder={'Email'}
                                        placeholderTextColor={'#fff'}
                                        autoCompleteType={'email'}
                                        style={styles.textInput}
                                        value={this.state.email}
                                        onChangeText={text => this.setState({ email: text })}
                                    />
                                    <EvilIcons style={{ position: 'absolute', left: 8 }} name="user" color="white" size={30} />
                                </View>

                                <View style={styles.viewInput}>
                                    <TextInput
                                        placeholder={'Telefon'}
                                        placeholderTextColor={'#fff'}
                                        autoCompleteType={'tel'}
                                        style={styles.textInput}
                                        value={this.state.phone}
                                        onChangeText={text => this.setState({ phone: text })}
                                    />
                                    <EvilIcons style={{ position: 'absolute', left: 8 }} name="user" color="white" size={30} />
                                </View>

                                <View style={styles.viewInput}>
                                    <Picker
                                        selectedValue={this.state.service}
                                        style={{ color: '#fff', marginLeft: 23 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ service: itemValue })
                                        }>
                                        {servicies.map((service, index) => {
                                            return (
                                                <Picker.Item key={index} label={service.toUpperCase()} value={service} />
                                            )
                                        })}
                                    </Picker>
                                </View>

                                <View style={styles.viewInput}>
                                    <Picker
                                        selectedValue={this.state.location}
                                        style={{ color: '#fff', marginLeft: 23 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ location: itemValue })
                                        }>
                                        {this.state.locations ?
                                            this.state.locations.map(location => {
                                                return (
                                                    <Picker.Item label={location.nume.toUpperCase()} value={location} />
                                                )
                                            })
                                            :
                                            null
                                        }
                                    </Picker>
                                </View>

                                <DatePicker
                                    style={{ width: 250, borderWidth: 1, borderRadius: 20, borderColor: '#fff', padding: 5 }}
                                    date={this.state.timestamp}
                                    mode="date"
                                    placeholder={this.state.timestamp ? this.state.timestamp : 'Selecteaza data'}
                                    placeholderTextColor={'#fff'}
                                    format={'YYYY-MM-DD'}
                                    minDate="2021-01-01"
                                    maxDate="2021-12-12"
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
                                    onDateChange={(date) => { this.setState({ timestamp: date }) }}
                                />

                                <View style={styles.viewInput}>
                                    <Picker
                                        selectedValue={this.state.medic}
                                        style={{ color: '#fff', marginLeft: 23 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ medic: itemValue })
                                        }>
                                        {this.state.medics ?
                                            this.state.medics.map(medic => {
                                                return (
                                                    <Picker.Item label={medic.nume.toUpperCase()} value={medic} />
                                                )
                                            })
                                            :
                                            null
                                        }
                                    </Picker>
                                </View>

                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={
                                        ['#3CDE87', '#C49C0F']
                                    }
                                    style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 30, marginTop: 10, }}>
                                    <TouchableOpacity
                                        style={{}}
                                        onPress={() => { this.sendAppointment() }}>
                                        <Text style={{ color: '#fff' }}>Trimite</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    }
                </View>
            </Modal>
        )
    }
}