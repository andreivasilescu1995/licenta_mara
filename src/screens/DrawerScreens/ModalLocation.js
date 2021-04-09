import React from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default class ModalLocation extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            lat: null,
            lng: null,
            title: null,
        }
    }

    toggleModal = () => { this.setState({ showModal: !this.state.showModal }) };

    setCoordinates(location) {
        this.setState({ lat: location.lat, lng: location.lng, title: location.title })
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
                    <View style={{ width: '95%', height: '60%', alignSelf: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10 }}>
                        {this.state.lat && this.state.lng ?
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={{ width: '100%', height: '100%' }}
                                region={{
                                    latitude: this.state.lat,
                                    longitude: this.state.lng,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.015,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude: this.state.lat, longitude: this.state.lng }}
                                    title={this.state.title}
                                />
                            </MapView>
                            :
                            null
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}