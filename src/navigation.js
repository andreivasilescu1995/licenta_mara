import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { BaseLogin } from './screens/BaseLogin';
import { Home } from './screens/Home';

import { styles } from './style';
import User from '../assets/img/user.svg';
import UserLogged from '../assets/img/userLogged.svg';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={'none'}>
                <Stack.Screen name={'BaseLogin'} component={BaseLogin} />
                <Stack.Screen name={'UnregisteredDrawerNav'} component={Unregistered} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const Unregistered = (props) => {
    return (
        <Drawer.Navigator
            initialRouteName={'Home'}
            drawerStyle={{ backgroundColor: '#232323' }}
            drawerContent={(props) => <DrawerNavigationContent {...props} />}
            drawerType={'slide'}
            edgeWidth={70}>

            <Drawer.Screen name={'Home'} component={Home} />
        </Drawer.Navigator>
    )
}

const DrawerNavigationContent = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(true);

    return (
        <>
            {loggedIn ?
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                    <UserLogged width={65} height={65} />
                    <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                        <Text style={[{ color: '#fff' }]}>Salut,</Text>
                        <Text style={{ color: '#fff' }}>Test user</Text>
                    </View>
                </View>
                :
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                    <User style={{ marginLeft: 35 }} width={65} height={65} />
                </View>
            }

            {loggedIn ?
                <DrawerContentScrollView {...props}>
                    <TouchableOpacity
                        onPress={() => setLoggedIn(false)}
                        style={{ width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, marginLeft: 15, borderWidth: 1, borderColor: '#fff', borderRadius: 20, marginBottom: 10 }}>
                        <Text style={{ color: '#fff' }}>Logout</Text>
                    </TouchableOpacity>
                    <DrawerItem labelStyle={styles.drawerLabel} label="Diagnostic temporar" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Servicii/Preturi" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Consultatiile mele" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Medici mei" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Programari" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Locatii" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Scaneaza cod QR" onPress={() => { }} />
                </DrawerContentScrollView>
                :
                <DrawerContentScrollView {...props}>
                    <TouchableOpacity
                        onPress={() => setLoggedIn(true)}
                        style={{ width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, marginLeft: 15, borderWidth: 1, borderColor: '#fff', borderRadius: 20 }}>
                        <Text style={{ color: '#fff' }}>Intra in cont</Text>
                    </TouchableOpacity>
                    <DrawerItem labelStyle={styles.drawerLabel} label="Programari rapide" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Servicii stomatologice" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Preturi" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Medici" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Locatii" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Contact" onPress={() => { }} />
                </DrawerContentScrollView>}
        </>
    );
}