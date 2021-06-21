import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import rootReducers from './component/reducer';
import Home from './component/screens/Home';

const store = createStore(rootReducers);
const Stack = createStackNavigator();


store.subscribe(()=>{
  console.debug('getState >> ',store.getState())
})

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}