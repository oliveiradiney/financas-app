import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";


import Home from "../screens/Home";
import New from "../screens/New";
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

function AppRoutes() {
    return (
        <Drawer.Navigator
            useLegacyImplementation
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#171717'
                },
                drawerLabelStyle:{
                    fontWeight: 'bold'
                },
                drawerActiveTintColor:"#FFF",
                drawerActiveBackgroundColor:"#00b94a",
                drawerInactiveBackgroundColor: '#000',
                drawerInactiveTintColor: '#DDD',
                drawerItemStyle:{
                    marginVertical: 5
                },
                headerShown: false

            }}
            
        >
            <Drawer.Screen name="Início" component={Home} />
            <Drawer.Screen name="Perfil" component={Profile} />
            <Drawer.Screen name="Registrar" component={New} />
        </Drawer.Navigator>
    )
}

export default AppRoutes;