import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { Login } from './screens/Login';
import { Register } from './screens/Register';
import Medics from './screens/DrawerScreens/Medics';
import Appointments from './screens/DrawerScreens/Appointments';
import Servicies from './screens/DrawerScreens/Servicies';
import Locations from './screens/DrawerScreens/Locations';
import Contact from './screens/DrawerScreens/Contact';
import Chat from './screens/DrawerScreens/Chat';

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
    if (props.route.params)
        creditentials = { username: props.route.params.username, avatar: props.route.params.avatar, user_id: props.route.params.user_id, medic: props.route.params.medic };

    return (
        <Drawer.Navigator
            drawerStyle={{ backgroundColor: '#232323' }}
            drawerContent={(props) => <DrawerNavigationContent {...props} creditentials={creditentials} />}
            drawerType={'slide'}
            edgeWidth={70}>

            <Drawer.Screen name={'Medics'} component={Medics} />
            <Drawer.Screen name={'Appointments'} component={Appointments} />
            <Drawer.Screen name={'Servicies'} component={Servicies} />
            <Drawer.Screen name={'Locations'} component={Locations} />
            <Drawer.Screen name={'Contact'} component={Contact} />
            <Drawer.Screen name={'Chat'} component={Chat} />
        </Drawer.Navigator>
    )
}

const DrawerNavigationContent = (props) => {
    const user = props.creditentials ? true : false;
    const isMedic = props.creditentials?.medic !== 0 ? true : false;
    const [loggedIn, setLoggedIn] = React.useState(user);
    const [medic, setMedic] = React.useState(isMedic);

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
                medic ?
                    <DrawerContentScrollView {...props}>
                        <TouchableOpacity
                            onPress={() => { setLoggedIn(false); props.navigation.navigate('Login') }}
                            style={{ width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, marginLeft: 15, borderWidth: 1, borderColor: '#fff', borderRadius: 20, marginBottom: 10 }}>
                            <Text style={{ color: '#fff' }}>Logout</Text>
                        </TouchableOpacity>
                        <DrawerItem labelStyle={styles.drawerLabel} label="Chat pacienti" onPress={() => { props.navigation.navigate('Chat', {creditentials: props.creditentials}) }} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Programari" onPress={() => { props.navigation.navigate('Appointments', { logged: true, user_id: props.creditentials.user_id, medic: props.creditentials.medic }) }} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Medici" onPress={() => { props.navigation.navigate('Medics') }} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Locatii" onPress={() => { props.navigation.navigate('Locations') }} />
                    </DrawerContentScrollView>
                    :
                    <DrawerContentScrollView {...props}>
                        <TouchableOpacity
                            onPress={() => { setLoggedIn(false); props.navigation.navigate('Login') }}
                            style={{ width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, marginLeft: 15, borderWidth: 1, borderColor: '#fff', borderRadius: 20, marginBottom: 10 }}>
                            <Text style={{ color: '#fff' }}>Logout</Text>
                        </TouchableOpacity>
                        <DrawerItem labelStyle={styles.drawerLabel} label="Intreaba un medic" onPress={() => { props.navigation.navigate('Chat', {creditentials: props.creditentials}) }} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Tarife" onPress={() => { props.navigation.navigate('Servicies') }} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Medici" onPress={() => { props.navigation.navigate('Medics') }} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Programari" onPress={() => { props.navigation.navigate('Appointments', { logged: true, user_id: props.creditentials.user_id }) }} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Locatii" onPress={() => { props.navigation.navigate('Locations') }} />
                    </DrawerContentScrollView>
                :
                <DrawerContentScrollView {...props}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Login')}
                        style={{ width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, marginLeft: 15, borderWidth: 1, borderColor: '#fff', borderRadius: 20 }}>
                        <Text style={{ color: '#fff' }}>Intra in cont</Text>
                    </TouchableOpacity>
                    <DrawerItem labelStyle={styles.drawerLabel} label="Programari" onPress={() => { props.navigation.navigate('Appointments', { logged: false }) }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Tarife" onPress={() => { props.navigation.navigate('Servicies') }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Medici" onPress={() => { props.navigation.navigate('Medics') }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Locatii" onPress={() => { props.navigation.navigate('Locations') }} />
                    <DrawerItem labelStyle={styles.drawerLabel} label="Contact" onPress={() => { props.navigation.navigate('Contact') }} />
                </DrawerContentScrollView>}
        </>
    );
}