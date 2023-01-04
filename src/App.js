import React, { Component } from 'react';
//import logo from './logo.svg';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './store/reducers/RootReducer';

import Loader from './components/common/Loader';
import Navi from './components/common/Navi';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
//import Sidebar2 from './components/common/Sidebar2';
import Routes from './routes/admin/Routes';



const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default class App extends Component {
  render() {
    return (
            <div className="wrapper">
            <Provider store={store}>
           <BrowserRouter> 
           <Loader/>
            <Navi/>
          <Sidebar/>
             
             <Routes/>
            <Footer/>
            </BrowserRouter>
            </Provider>
            
            </div>
    );
}
}


if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
