import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';

export default class ModalNewAppointment extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            img_uri: null,
        }

        console.log('PROPS MODAL MEDIC: ', props);
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
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1 }}>
                </TouchableOpacity>
                <View style={{ position: 'absolute', zIndex: 2, top: '25%', backgroundColor: '#fff', borderRadius: 10, width: '90%', height: '50%', alignSelf: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.img_uri ?
                            <Image source={{ uri: this.state.img_uri }} style={{ height: 125, width: 125, resizeMode: 'cover', borderRadius: 63 }} />
                            :
                            <View style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: '#d8d8d8' }} />
                        }
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{}}>Dr. Mircea Ardeleanu a facut parte din Asociatiile Stomatologice știintifice si a participat constant la cursuri si congrese de specialitate:</Text>
                        <Text style={{}}>Competenta in implantologie dentara – Ministerul Sanatatii (2012)</Text>
                        <Text style={{}}>Maraton de Estetica Dentara – Poiana Brasov, Romania, 2012</Text>
                        <Text style={{}}>Cursuri fotografie dentara – Bucuresti, 2012 si Timișoara, 2012</Text>
                        <Text style={{}}>Curs Implantologie – Traunreut, Germania, 2012</Text>
                        <Text style={{}}>Congresul international de estetica dentara – SSER Societatea de stomatologie estetica din Romania, Prof. Univ. Dr. Constantin Varlan, Prof. Univ.Dr. Bogdan Dimitriu, Bucuresti, 2012</Text>
                        <Text style={{}}>Curs Suturi ai Lambouri – Bucuresti, 2013</Text>
                        <Text style={{}}>Curs Implantologie – Padova, Italia, 2013</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}