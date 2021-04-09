import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';

export default class ModalNewAppointment extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            img_uri: null,
        }

        // console.log('PROPS MODAL MEDIC: ', props);
    }

    toggleModal = () => { this.setState({ showModal: !this.state.showModal }) };

    changeMedicImage(img) {
        this.setState({ img_uri: img });
    }

    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.showModal}
                transparent={true}
                onRequestClose={() => { this.toggleModal() }}>
                <TouchableOpacity
                    onPress={() => this.toggleModal()}
                    style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                </TouchableOpacity>
                <View style={{ position: 'absolute', zIndex: 2, top: '20%', backgroundColor: '#fff', borderRadius: 10, width: '90%', height: '65%', alignSelf: 'center' }}>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.img_uri ?
                            <Image source={{ uri: this.state.img_uri }} style={{ height: 125, width: 125, resizeMode: 'cover', borderRadius: 63 }} />
                            :
                            <View style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: '#d8d8d8' }} />
                        }
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text style={{}}>{this.props.medic?.istoric}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}