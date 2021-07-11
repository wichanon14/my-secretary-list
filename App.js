import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { startDatabase, GetAllDailyTaskByDate, GetAllLedger } from './component/database';
import { MenuProvider } from 'react-native-popup-menu';
import rootReducers from './component/reducer';
import Home from './component/screens/Home';
import Template from './component/screens/Template';
import { toyyyyMMDD } from './component/central';
import Ledger from './component/screens/Ledger';
const store = createStore(rootReducers);
const Stack = createStackNavigator();

const db = startDatabase();

store.dispatch({
  type : "SET_DATABASE_CONNECTION",
  payload : db
})

GetAllDailyTaskByDate(db,toyyyyMMDD(new Date),store.dispatch)
GetAllLedger(db,store.dispatch)

store.subscribe(()=>{
  //console.debug('getState >> ',store.getState())
})


export default function App() {

  return (
    <MenuProvider customStyles={menuProviderStyles}>
      <Provider store={store} >
        <NavigationContainer>
          <Stack.Navigator headerMode={'none'} initialRouteName={'Template'}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Template" component={Template} />
            <Stack.Screen name="Ledger" component={Ledger} />
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