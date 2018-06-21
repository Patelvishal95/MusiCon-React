import React from 'react'
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Search from './components/Search'
import {Reducer} from './reducers/Reducer'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import NavigationBar from "./components/Navigation-Bar";
import HomeContainer from "./containers/HomeContainer";

let store = createStore(Reducer);

class MernClient
    extends React.Component {
    render() {
        return (
            <h1>MERN Music Client</h1>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <HomeContainer/>
    </Provider>,
    document.getElementById('root'));
