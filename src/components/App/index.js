import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createHashHistory } from 'history';

import AddBaby from '../AddBaby';

const history = createHashHistory();

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={history} >
      <Route path='/'>
        <AddBaby />
      </Route>
    </Router>
  </Provider>
);


export default App;
