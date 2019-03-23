import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './src/Navigation/Navigation';
import ProfileReducer from './src/Container/Profile/Store/Reducer';

const reducers = combineReducers({
  profile: ProfileReducer
});

const store = createStore(reducers);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;