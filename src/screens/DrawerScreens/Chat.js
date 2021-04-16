import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import emitter from 'tiny-emitter/instance';

import { Header } from '../../components/Header';
import io from "socket.io-client";

let endpoint = "http://localhost:5000";

export default class Chat extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loading: true,
            messages: [],
            message: null,
        }
        this.socket = io.connect(endpoint);
        this.refMessages = React.createRef();

        console.log('PROPS CHAT: ', props);
    }

    componentDidMount() {
        this.socket.on("new_message", msg => {
            // console.log('MESAJ NOU: ', msg)
            let messages = this.state.messages;
            messages.push({ sender_id: msg.sender_id, text: msg.text });
            this.setState({ messages: messages });
            this.refMessages.current.scrollToEnd();
        });
    }

    componentWillUnmount() {
        emitter.off('new_message');
        this.socket.disconnect();
    }

    sendMessage() {
        if (this.state.message) {
            console.log('SOCKET: ', this.socket.emit("message", { sender_id: this.socket.id, text: this.state.message }));
            this.setState({ message: null });
        }
    };

    render() {
        return (
            <>
                <Header navigation={this.props.navigation} />
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
                                    <View key={message.index} style={{ alignSelf: message.item.sender_id !== this.socket.id ? 'flex-start' : 'flex-end', paddingHorizontal: 20, paddingVertical: 7, elevation: 10, backgroundColor: message.item.sender_id !== this.socket.id ? 'green' : 'blue', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginBottom: 10, marginRight: 10 }}>
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