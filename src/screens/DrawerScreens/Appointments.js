import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../style';

import ModalNewAppointment from './ModalNewAppointment';

import Icon from "react-native-vector-icons/Entypo";

export default class Appointments extends React.Component {
    constructor(props) {
        super();
        this.state = {
            logged: props.logged,
        };
        this.refModalApp = React.createRef();
    }

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                colors={['#3b5998', '#192f6a']}
                style={[styles.container, { alignItems: 'center' }]}>

                {this.props.logged ?
                    null
                    :
                    <>
                        <ModalNewAppointment ref={this.refModalApp} />
                        <Text style={{ color: '#fff', marginTop: '5%', marginBottom: 10 }}>Programari rapide</Text>
                        <TouchableOpacity
                            onPress={() => { this.refModalApp.current.toggleModal() }}
                            style={{}}>
                            <Icon name={'circle-with-plus'} color='#fff' size={35} />
                        </TouchableOpacity>
                    </>
                }
            </LinearGradient>
        )
    }
}