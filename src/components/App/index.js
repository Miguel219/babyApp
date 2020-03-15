import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import { createHashHistory } from 'history';

import * as selectors from '../../reducers';
import AddBaby from '../AddBaby';
import EventBabies from '../EventBabies';

const history = createHashHistory();
const App = ({ store }) => { 
  return(
  <Provider store={store}>
    <Router history={history} >
    <Route exact path="/" render={() => { 
      const initialPage = ((selectors.getBabies(store.getState()).length !== 0) 
        ? '/eventBabies'  
        : '/createBaby');
      return(
      <Redirect to={initialPage}/>
    )}}/>
      <Route path='/createBaby'>
        <AddBaby />
      </Route>
      <Route path='/eventBabies'>
        <EventBabies />
      </Route>
    </Router>
  </Provider>
)};


export default App;
