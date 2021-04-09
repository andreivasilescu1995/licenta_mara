import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import api from '../../api';
import { Header } from '../../components/Header';
import ModalSubservice from './ModalSubservice';

export default class Servicies extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loading: true,
            servicies: [],
        }
        this.refModal = React.createRef();
    }

    componentDidMount() {
        api.post('getServicies', {})
            .then(response => {
                // console.log('Servicii: ', response);
                this.setState({ servicies: response.data, loading: false });
            })
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <>
                <ModalSubservice ref={this.refModal} />
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
                            {this.state.servicies.map(service => {
                                return (
                                    <TouchableOpacity
                                        key={service.id}
                                        onPress={() => {
                                            this.refModal.current.setId(service.id);
                                            this.refModal.current.toggleModal();
                                        }}
                                        style={{ marginVertical: 10, paddingLeft: 10 }}>
                                        <Text style={{ color: '#fff' }}>{service.nume}</Text>
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