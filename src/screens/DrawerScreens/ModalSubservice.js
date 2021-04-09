import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import api from '../../api';

export default class ModalNewAppointment extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            subservicies: null,
        }
    }

    toggleModal = () => { this.setState({ showModal: !this.state.showModal }) };

    setId(id) {
        api.post('getSubService', { id: id })
            .then(response => {
                console.log('RESPONSE SUBSERVICIES: ', response.data);
                this.setState({ subservicies: response.data })
            })
    }

    render() {
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

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '95%', alignSelf: 'center', backgroundColor: '#fff', borderRadius: 10 }}>
                        {this.state.subservicies ?
                            <ScrollView contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 10 }}>
                                {this.state.subservicies.map(subservice => {
                                    return (
                                        <Text style={{ paddingBottom: 10, fontWeight: 'bold' }}>{subservice.nume} : <Text style={{ fontWeight: 'normal' }}> {subservice.pret} lei</Text></Text>
                                    )
                                })}
                            </ScrollView>
                            :
                            null
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}