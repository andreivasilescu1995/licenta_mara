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
            servicies: null,
            selectedService: null,
            subServicies: null,
            selectedSubservice: null,

            loading: true,
            medics: null,
            location: null,
        }
    }

    componentDidMount() {
        this.getMedics();
        this.getLocations();
        this.getServicies();
    }

    toggleModal = () => { this.setState({ showModal: !this.state.showModal }) };

    sendAppointment() {
        // console.log('DATE:', this.state);
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
                id_pacient: this.props.user_id,
                id_serviciu: this.state.selectedService.id,
                id_subserviciu: this.state.selectedSubservice.id,
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

    getServicies() {
        api.post('getServicies', {})
            .then(response => {
                // console.log('Servicii: ', response);
                this.setState({ servicies: response.data, selectedService: response.data[0], loading: false }, () => {
                    this.getSubServicies();
                });
            })
            .finally(() => this.setState({ loading: false }));
    }

    getSubServicies() {
        api.post('getSubService', { id: this.state.selectedService.id })
            .then(response => {
                // console.log('RESPONSE SUBSERVICIES: ', response.data);
                this.setState({ subServicies: response.data, selectedSubservice: response.data[0], loading: false });
            })
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
                        <View style={{ width: '100%', height: '90%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                            <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: 10 }}>
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
                                        style={{ width: '100%', color: '#fff', marginLeft: 23 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ service: itemValue })
                                        }>
                                        {servicies.map((service, index) => {
                                            return (
                                                <Picker.Item key={index} label={service.toUpperCase()} value={service.nume} />
                                            )
                                        })}
                                    </Picker>
                                </View>

                                <View style={styles.viewInput}>
                                    <Picker
                                        selectedValue={this.state.location}
                                        style={{ width: '100%', color: '#fff', marginLeft: 23 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ location: { id: itemIndex + 1, nume: itemValue } })
                                        }>
                                        {this.state.locations ?
                                            this.state.locations.map((location, index) => {
                                                return (
                                                    <Picker.Item key={index} label={location.nume.toUpperCase()} value={location.nume} />
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
                                        style={{ width: '100%', color: '#fff', marginLeft: 23 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ medic: { id: itemIndex + 1, nume: itemValue } })
                                        }>
                                        {this.state.medics ?
                                            this.state.medics.map((medic, index) => {
                                                return (
                                                    <Picker.Item key={index} label={medic.nume.toUpperCase()} value={medic.nume} />
                                                )
                                            })
                                            :
                                            null
                                        }
                                    </Picker>
                                </View>

                                <View style={styles.viewInput}>
                                    <Picker
                                        selectedValue={this.state.selectedService ? this.state.selectedService.value : null}
                                        style={{ width: '100%', color: '#fff', marginLeft: 23 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ selectedService: { id: itemIndex + 1, value: itemValue } }, () => this.getSubServicies())
                                        }>
                                        {this.state.servicies != null ?
                                            this.state.servicies.map((service, index) => {
                                                return (
                                                    <Picker.Item key={index + 's'} label={service.nume.toUpperCase()} value={service.nume} />
                                                )
                                            })
                                            :
                                            null
                                        }
                                    </Picker>
                                </View>

                                <View style={styles.viewInput}>
                                    <Picker
                                        selectedValue={this.state.selectedSubservice ? this.state.selectedSubservice.value : null}
                                        style={{ width: '100%', color: '#fff', marginLeft: 23 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ selectedSubservice: { id: itemIndex + 1, value: itemValue } })
                                        }>
                                        {this.state.subServicies != null ?
                                            this.state.subServicies.map((service, index) => {
                                                return (
                                                    <Picker.Item key={index + 'ss'} label={service.nume.toUpperCase()} value={service.nume} />
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
                                        onPress={() => { this.sendAppointment(); this.props.onRefresh(); this.toggleModal(); }}>
                                        <Text style={{ color: '#fff' }}>Trimite</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    }
                </View>
            </Modal >
        )
    }
}