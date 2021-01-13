import React from 'react';
import './App.css';
import { Router,Route,Switch,Link} from 'react-router-dom';
import CreateMenu from './views/CreateMenu';
import Menu from './views/Menu';

function App() {

  return (
    <>
      <p>test</p>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Menu/>
          </Route>
          <Route path='/loja/117/menu'>
            <CreateMenu/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
