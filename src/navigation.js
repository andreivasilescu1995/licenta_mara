import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { Login } from './screens/Login';
import { Home } from './screens/DrawerScreens/Home';
import { Register } from './screens/Register';
import Medics from './screens/DrawerScreens/Medics';
import Appointments from './screens/DrawerScreens/Appointments';
import Servicies from './screens/DrawerScreens/Servicies';
import Locations from './screens/DrawerScreens/Locations';
import Contact from './screens/DrawerScreens/Contact';

import { styles } from './style';
import User from '../assets/img/user.svg';
import UserLogged from '../assets/img/userLogged.svg';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode={'none'}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal'
                }}>
                <Stack.Screen name={'Login'} component={Login} />
                <Stack.Screen name={'DrawerNav'}>{props => <DrawerNav {...props} />}</Stack.Screen>
                <Stack.Screen name={'Register'}>{props => <Register {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const DrawerNav = (props) => {
    var creditentials = null;
    if (props.route.params.username != undefined)
        creditentials = { username: props.route.params.username, avatar: props.route.params.avatar };

    return (
        <Drawer.Navigator
            initialRouteName={'Home'}
            drawerStyle={{ backgroundColor: '#232323' }}
            drawerContent={(props) => <DrawerNavigationContent {...props} creditentials={creditentials} />}
            drawerType={'slide'}
            edgeWidth={70}>

            <Drawer.Screen name={'Home'} component={Home} />
            <Drawer.Screen name={'Medics'} component={Medics} />
            <Stack.Screen name={'Appointments'} component={Appointments} />
            <Stack.Screen name={'Servicies'} component={Servicies} />
            <Stack.Screen name={'Locations'} component={Locations} />
            <Stack.Screen name={'Contact'} component={Contact} />
        </Drawer.Navigator>
    )
}

const DrawerNavigationContent = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(props.creditentials != null ? true : false);

    return (
        <>
            {loggedIn ?
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                    <UserLogged width={65} height={65} />
                    <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                        <Text style={[{ color: '#fff' }]}>Salut,</Text>
                        <Text style={{ color: '#fff' }}>{props.creditentials.username}</Text>
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
                    <DrawerItem labelStyle={styles.drawerLabel} label="Medicii mei" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Programari" onPress={() => { props.navigation.navigate('Appointments') }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Locatii" onPress={() => { }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Scaneaza cod QR" onPress={() => { }} />
                </DrawerContentScrollView>
                :
                <DrawerContentScrollView {...props}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Login')}
                        style={{ width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, marginLeft: 15, borderWidth: 1, borderColor: '#fff', borderRadius: 20 }}>
                        <Text style={{ color: '#fff' }}>Intra in cont</Text>
                    </TouchableOpacity>
                    <DrawerItem labelStyle={styles.drawerLabel} label="Programari" onPress={() => { props.navigation.navigate('Appointments') }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Tarife" onPress={() => { props.navigation.navigate('Servicies') }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Medici" onPress={() => { props.navigation.navigate('Medics') }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Locatii" onPress={() => { props.navigation.navigate('Locations') }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Contact" onPress={() => { props.navigation.navigate('Contact') }} />
                </DrawerContentScrollView>}
        </>
    );
}