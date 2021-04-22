import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import EvilIcons from "react-native-vector-icons/EvilIcons";
import api from '../api';

export default class Header extends React.Component {
    constructor(props) {
        super();
        this.state = {
            users: null,
            selectedUser: null,
        }

        // console.log('PROPS HEADER: ', props)
    }

    componentDidMount() {
        if (this.props.chat) {
            api.post('/getUsers', { id_user: this.props.user_id })
                .then(response => {
                    // console.log('RESPONSE USERS: ', response);
                    this.setState({ users: response.data, selectedUser: response.data[0] }, () => this.props.onChangeUser(this.state.selectedUser));
                });
        }
    }

    render() {
        return (
            <>
                <StatusBar backgroundColor={'#2A52BE'} animated />
                <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#2A52BE' }}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 10 }}
                        onPress={() => { this.props.navigation.toggleDrawer() }}>
                        <EvilIcons style={{}} name="navicon" color="white" size={30} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff' }}>{this.props?.title}</Text>
                    {this.props.chat && this.state.users ?
                        <Picker
                            selectedValue={this.state.selectedUser.username}
                            style={{ width: '100%', color: '#fff', marginLeft: 20, borderWidth: 1, borderColor: 'red', padding: 10 }}
                            onValueChange={(itemValue, itemIndex) => {
                                const index = this.state.users.map(e => e.username).indexOf(itemValue);
                                this.setState({ selectedUser: { id: this.state.users[index].id, username: itemValue, sid: this.state.users[index].sid } }, () => {
                                    this.props.onChangeUser(this.state.selectedUser);
                                });
                            }}>
                            {this.state.users ?
                                this.state.users.map((user, index) => {
                                    return (
                                        <Picker.Item key={index} label={user.username} value={user.username} />
                                    )
                                })
                                :
                                null
                            }
                        </Picker>
                        :
                        null
                    }
                </View>
            </>
        )
    }
}