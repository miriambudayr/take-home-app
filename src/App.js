import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import List from './List';
import Note from './Note';

function App() {
  return (
    <div className='App row'>
      <Route exact path='/' component={List}></Route>
      <Route exact path='/:page' component={List}></Route>
      <Route exact path='/note/:id' component={Note}></Route>
      {/* Icons made by
      <a href='https://www.flaticon.com/authors/google' title='Google'>
        Google
      </a>
      from
      <a href='https://www.flaticon.com/' title='Flaticon'>
        {' '}
        www.flaticon.com
      </a> */}
    </div>
  );
}

export default App;
