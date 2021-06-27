import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { startDatabase, GetAllDailyTaskByDate } from './component/database';
import { MenuProvider } from 'react-native-popup-menu';
import rootReducers from './component/reducer';
import Home from './component/screens/Home';
import { toyyyyMMDD } from './component/central';
const store = createStore(rootReducers);
const Stack = createStackNavigator();

const db = startDatabase();

store.dispatch({
  type : "SET_DATABASE_CONNECTION",
  payload : db
})

GetAllDailyTaskByDate(db,toyyyyMMDD(new Date),store.dispatch)

store.subscribe(()=>{
  //console.debug('getState >> ',store.getState())
})


export default function App() {

  return (
    <MenuProvider customStyles={menuProviderStyles}>
      <Provider store={store} >
        <NavigationContainer>
          <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Home" component={Home} db={db}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </MenuProvider>
    
  );
}

const menuProviderStyles = {
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.5,
  }
};