import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import api from '../../api';
import ModalMedic from './ModalMedic';
import Header from '../../components/Header';

export default class Medics extends React.Component {
    constructor(props) {
        super();
        this.state = {
            medics: [],
            selectedMedic: null,
            loading: true,
        }
        this.refMedic = React.createRef();
    }

    componentDidMount() {
        api.post('getMedics', {})
            .then(response => {
                // console.log('MEDICI: ', response);
                this.setState({ medics: response.data, loading: false });
            })
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <>
                <ModalMedic
                    ref={this.refMedic}
                    medic={this.state.selectedMedic}
                />
                <Header navigation={this.props.navigation} title='Medici' />
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
                            {this.state.medics.map(medic => {
                                const img_uri = 'data:image/png;base64,' + medic.avatar;
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ selectedMedic: medic });
                                            this.refMedic.current.changeMedicImage('data:image/png;base64,' + medic.avatar);
                                            this.refMedic.current.toggleModal();
                                        }}
                                        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingLeft: 10 }}>
                                        <Image source={{ uri: img_uri }} style={{ width: 75, height: 75, resizeMode: 'cover', borderRadius: 37, marginRight: 20 }} />
                                        <View style={{}}>
                                            <Text style={{ fontSize: 18, color: '#fff' }}>{medic.nume}</Text>
                                            <Text styl={{ fontSize: 16, color: '#fff' }}>{medic.spec}</Text>
                                        </View>
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