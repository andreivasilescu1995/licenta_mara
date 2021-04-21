import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';

import Header from '../../components/Header';
import api from '../../api';

import io from "socket.io-client";
let endpoint = "http://localhost:5000/private";

export default class Chat extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loading: true,
            messages: [],
            message: null,
            selectedUser: null,
        }
        this.socket = io.connect(endpoint);
        this.sid = null;
        this.refMessages = React.createRef();

        console.log('PROPS CHAT: ', props);
    }

    componentDidMount() {
        this.socket.emit('username', this.props.route.params.creditentials.username);

        this.socket.on('send_user_sid', sid => {
            // console.log('RECEIVED NEW SID: ', sid['sid']);
            this.sid = sid['sid'].toString();
            api.post('/updateSid', { id_user: this.props.route.params.creditentials.user_id, sid: sid['sid'] })
                .then(response => {
                    console.log('RESPONSE UPDATE SID: ', response);
                    this.sid = sid['sid']
                })
        })

        this.socket.on("new_private_message", msg => {
            console.log('AM PRIMIT MESAJ: ', msg, typeof (this.sid));
            let messages = this.state.messages;
            messages.push({ sender_id: msg.sender_id, text: msg.text });
            this.setState({ messages: messages });
            this.refMessages.current.scrollToEnd();
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    getConversation(sender_user, receiver_user) {
        api.post('getConversation', { sender_user: sender_user, receiver_user: receiver_user })
            .then(result => {
                console.log('RESULT GET CONVERSATION: ', result.data);
                this.setState({ messages: result.data });
            })
    }

    sendMessage() {
        // console.log('TRIMIT MESAJUL: ', this.state.message, ' CATRE ', this.state.selectedUser.username);
        if (this.state.message) {
            let messages = this.state.messages;
            messages.push({ sender_id: this.sid, text: this.state.message });
            this.socket.emit('private_message', { 'username': this.state.selectedUser.username, 'message': this.state.message });
            this.setState({ message: null, messages: messages });
        }
    };

    render() {
        return (
            <>
                <Header
                    navigation={this.props.navigation}
                    title={'Chat'}
                    chat={true}
                    user_id={this.props.route?.params?.creditentials.user_id}
                    onChangeUser={(user) => {
                        this.setState({ selectedUser: user }, () => {
                            this.getConversation(this.props.route.params.creditentials.username, this.state.selectedUser.username);
                            console.log('SID UL MEU: ', this.sid)
                        })
                    }}
                />
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#3b5998', '#192f6a']}
                    style={{ flex: 1 }}>

                    <View style={{ flex: 8, marginVertical: 10 }}>
                        <FlatList
                            ref={this.refMessages}
                            data={this.state.messages}
                            contentContainerStyle={{ padding: 10, paddingBottom: 60 }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={message => {
                                // console.log('MESAJ DE RANDAT: ', message)
                                return (
                                    <View style={{ alignSelf: message.item.sender_id == this.sid ? 'flex-start' : 'flex-end', paddingHorizontal: 20, paddingVertical: 7, elevation: 10, backgroundColor: message.item.sender_id == this.sid ? 'green' : 'blue', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginBottom: 10, marginRight: 10 }}>
                                        <Text selectable={true} selectionColor='orange' style={{ flexWrap: 'wrap', color: '#fff' }}>{message.item.text}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>

                    <KeyboardAvoidingView behavior='height' style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 10 }}>
                        <TextInput
                            style={{ flex: 1, marginRight: 10, paddingLeft: 10, backgroundColor: '#d8d8d8', borderRadius: 10, elevation: 10 }}
                            value={this.state.message}
                            multiline={true}
                            onChangeText={text => this.setState({ message: text })}>
                        </TextInput>
                        <TouchableOpacity
                            onPress={() => { this.sendMessage() }}
                            style={{ backgroundColor: 'green', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, elevation: 10 }}>
                            <Text style={{ color: '#fff' }}>Send</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </LinearGradient>
            </>
        )
    }
}