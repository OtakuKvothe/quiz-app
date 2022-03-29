import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Quiz from '../screens/Quiz';
import Result from '../screens/Result';
import Category from '../screens/Category';

const Stack = createStackNavigator();

function MainStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Category'
                component={Category}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Quiz'
                component={Quiz}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Result'
                component={Result}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default MainStack;