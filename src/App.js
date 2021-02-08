import React from 'react';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Cardapio from './views/Cardapio.js';
import Cliente from './views/Cliente';
import Perfil from './views/Perfil';
import Relatorios from './views/Relatorios';
import Configuracoes from './views/Configuracoes';
import Sobre from './views/Sobre';
import Detalhes from './views/Detalhes';

import MenuContextProvider from './contexts/ThemeContext';

import './App.css'
function App() {

  return (
    <>
      <MenuContextProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Cliente/>
            </Route>
            <Route path='/loja/117/cardapio'>
              <Cardapio/>
            </Route>
            <Route path='/loja/117/loja'>
              <Perfil/>
            </Route>
            <Route path='/loja/117/relatorios'>
              <Relatorios/>
            </Route>
            <Route path='/loja/117/configuracoes'>
              <Configuracoes/>
            </Route>
            <Route path='/sobre'>
              <Sobre/>
            </Route>
            <Route path='/produto/:id'>
              <Detalhes/>
            </Route>
          </Switch>
        </Router>
      </MenuContextProvider>
    </>
  );
}

export default App;
