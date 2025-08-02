import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider} from 'react-redux';
import { SQLiteProvider } from 'expo-sqlite';

import store from './src/store';
import RootNavigator from './src/navigation/rootNavigation';
import { initSessionTable } from './src/db';

export default function App() {

  return (
    <SQLiteProvider databaseName='pokerescateDB' onInit={initSessionTable}>
      <Provider store = {store}>
        <RootNavigator/>
        <StatusBar style="light" />
      </Provider>
    </SQLiteProvider>
  );
}

