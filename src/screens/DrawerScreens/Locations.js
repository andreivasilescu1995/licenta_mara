import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import api from '../../api';
import { Header } from '../../components/Header';
import ModalLocation from './ModalLocation';

export default class Locations extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loading: true,
            locations: [],
        }
        this.refModal = React.createRef();
    }

    componentDidMount() {
        api.post('getLocations', {})
            .then(response => {
                // console.log('Locatii: ', response);
                this.setState({ locations: response.data, loading: false });
            })
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <>
                <ModalLocation ref={this.refModal} />
                <Header navigation={this.props.navigation} />
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#3b5998', '#192f6a']}
                    style={{ flex: 1 }}>
                    {this.state.loading ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={30} color={'#ffd101'} />
                        </View>
                        :
                        <ScrollView>
                            {this.state.locations.map(location => {
                                return (
                                    <TouchableOpacity
                                        key={location.id}
                                        onPress={() => {
                                            this.refModal.current.setCoordinates(location);
                                            this.refModal.current.toggleModal();
                                        }}
                                        style={{ marginVertical: 10, paddingLeft: 10 }}>
                                        <Text style={{ color: '#fff' }}>{location.nume} - {location.adresa}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    }
                </LinearGradient>
            </>
        )
    }
}