import React from 'react';
import {BrowserRouter as Router, 
  Switch, 
  Route, 
  Link
} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import './App.css';

import About from './components/about'
import Topics from './components/topics'
import Proficiencies from './components/character/proficiencies';
import ConditionsTable from './components/character/conditions'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <nav>
            <ul style={{flex: 1}} className="navList">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="about">About</Link>
              </li>
              <li>
                <Link to="topics">Topics</Link>
              </li>
              <li>
                <Link to="/profs">Proficencies</Link>
              </li>
              <li>
                <Link to="/conds">Conditions</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/profs">
              <Proficiencies />
            </Route>
            <Route path="/conds">
              <ConditionsTable />
            </Route>
            <Route path="/">
              <h2>Home</h2>
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
