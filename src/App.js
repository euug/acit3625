import React, { useReducer, createContext } from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import Home from './components/Home';
import About from './components/About';
import API from './components/API';
import Navbar from './components/Navbar';
import Error from './components/Error';

import { reducer, initialState } from './reducer';

export const AppContext = createContext();

function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentTheme } = state;

  return (
    <div className='todoapp stack-large'>
      <ThemeProvider theme={currentTheme}>
        <AppContext.Provider value={{ ...state, dispatch }}>
          <GlobalStyles />
          <Navbar/>
          <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/about' component={About}/>
            <Route path='/api' component={API}/>
            <Route component={Error}/>
          </Switch>
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 100;
    box-sizing: border-box;
    background: ${props => props.theme.backgroundColor};
    font-family: sans-serif;
  }
`;

export default App;