import React from 'react'
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import email from 'react-native-email'

import api from '../../api';
import Header from '../../components/Header';

export default class Medics extends React.Component {
    constructor(props) {
        super();
        this.state = {
            nume: null,
            email: null,
            mesaj: null,
            loading: true,
        }
    }

    handleEmail() {
        const to = ['andrei.vasilescu1995@gmail.com']
        email(to, {
            subject: 'CONTACT - ' + this.state.nume,
            body: this.state.mesaj,
        }).catch(console.error)
    }

    render() {
        return (
            <>
                <Header navigation={this.props.navigation} />
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#3b5998', '#192f6a']}
                    style={{ flex: 1, justifyContent: 'center' }}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ color: '#fff', marginVertical: 20 }}>ARADENT - Smile Design Clinic</Text>
                        <Text style={{ color: '#fff', marginBottom: 50 }}>Call Center: 072123456</Text>

                        <TextInput
                            placeholder={'Nume si prenume'}
                            style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.5)', color: '#000', borderRadius: 10, marginBottom: 20 }}
                            value={this.state.nume}
                            onChangeText={text => this.setState({ nume: text })}
                        />

                        <TextInput
                            placeholder={'Mesaj'}
                            style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.5)', color: '#000', borderRadius: 10, marginBottom: 20 }}
                            value={this.state.mesaj}
                            onChangeText={text => this.setState({ mesaj: text })}
                            multiline={true}
                            numberOfLines={5}
                        />

                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={
                                ['#3CDE87', '#C49C0F']
                            }
                            style={{ width: '40%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 30, marginTop: 40, }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => { this.handleEmail() }}>
                                <Text style={{ color: '#fff' }}>Trimite</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </LinearGradient>
            </>
        )
    }
}