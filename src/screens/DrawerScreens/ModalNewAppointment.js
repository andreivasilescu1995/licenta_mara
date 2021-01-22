import React from 'react';
import { Modal, View, Text, TextInput } from 'react-native';
import { styles } from '../../style';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import EvilIcons from "react-native-vector-icons/EvilIcons";
import FoundationIcons from "react-native-vector-icons/Foundation";
import EntypoIcons from 'react-native-vector-icons/Entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

export default class ModalNewAppointment extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: true,

            name: 'test',
            age: 20,
            email: 'test@test.com',
            phone: '123456',
            service: 'consultatie',
            location: null,
            timestamp: null,
            medic: null,
        }
    }

    toggleModal = () => { this.setState({ showModal: !this.state.showModal }) };

    getSelectedData = () => {
        const data = this.state;
        return (
            {
                name: data.name,
                age: data.age,
                email: data.email,
                phone: data.phone,
                service: data.service,
                location: data.location,
                timestamp: data.timestamp,
                medic: data.medic,
            }
        )
    }

    render() {
        let servicies = ['consultatie', 'tratament'];
        let locations = ['Bucuresti', 'Constanta'];
        let medics = ['Mara', 'Andrei'];

        return (
            <Modal
                animationType="slide"
                visible={this.state.showModal}
                transparent={true}
                onRequestClose={() => { this.toggleModal() }}>

                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '100%', height: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
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
                                <Picker
                                    selectedValue={this.state.service}
                                    style={{ color: '#fff', marginLeft: 23 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ service: itemValue })
                                    }>
                                    {servicies.map(service => {
                                        return (
                                            <Picker.Item label={service.toUpperCase()} value={service} />
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
                                    {locations.map(location => {
                                        return (
                                            <Picker.Item label={location.toUpperCase()} value={location} />
                                        )
                                    })}
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
                                    {medics.map(medic => {
                                        return (
                                            <Picker.Item label={medic.toUpperCase()} value={medic} />
                                        )
                                    })}
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>

            </Modal >
        )
    }
}