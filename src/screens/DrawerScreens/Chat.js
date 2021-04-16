import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import emitter from 'tiny-emitter/instance';

import { Header } from '../../components/Header';
import io from "socket.io-client";

let endpoint = "http://localhost:5000";
let socket = io.connect(endpoint);

socket.on("message", msg => {
    emitter.emit('sync_message', msg);
});

export default class Chat extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loading: true,
            messages: [],
            message: null,
        }
    }

    componentDidMount() {
        emitter.on('sync_messages', msg => {
            this.setState({ messages: msg });
            alert('NEW MESSAGE: ' + msg);
        })
    }

    componentWillUnmount() {
        emitter.off('sync_messages');
    }

    sendMessage() {
        if (this.state.message) {
            socket.emit("message", this.state.message);
            let messages = this.state.messages;
            messages.push(this.state.message);
            this.setState({ messages: messages, message: null });
        }
    };

    render() {
        return (
            <>
                <Header navigation={this.props.navigation} />
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#3b5998', '#192f6a']}
                    style={{ flex: 1, justifyContent: 'center' }}>

                    <View style={{ flex: 8, marginVertical: 10 }}>
                        <ScrollView>
                            {this.state.messages.map((message, index) => {
                                return (
                                    <View key={index} style={{ width: '70%', alignSelf: 'flex-end', elevation: 10, backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginBottom: 10, marginRight: 10 }}>
                                        <Text style={{ flexWrap: 'wrap', color: '#fff' }}>{message}</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <TextInput
                            style={{ flex: 1, marginRight: 10, backgroundColor: '#d8d8d8', borderRadius: 10, elevation: 10 }}
                            value={this.state.message}
                            onChangeText={text => this.setState({ message: text })}>
                        </TextInput>
                        <TouchableOpacity
                            onPress={() => { this.sendMessage() }}
                            style={{ backgroundColor: 'green', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, elevation: 10 }}>
                            <Text style={{ color: '#fff' }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </>
        )
    }
}