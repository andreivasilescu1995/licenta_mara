import React from 'react'
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        marginVertical: '30%',
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
    },
    loginButtonContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    viewInput: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 20,
        paddingLeft: 20,
    },
    textInput: {
        width: '100%',
        paddingLeft: 30,
        color: '#fff'
    },
    loginButton: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 40,
    },
    drawerLabel: {
        color: '#fff',
    }
})