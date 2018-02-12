import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import CharaStatus from './CharaStatus.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../css/charamaker.css';

export default class CharaMaker extends Component {
    
    constructor(){
        super();
        this.state = {users:null};
    }

    componentDidMount() {
        var local = this;
        fetch('/api/users').then(function(response) {
            return response.json();
        }).then(function(json) {
            local.setState({users:json});
        });
    }
    
    render() {
        const { users } = this.state;
        return (<div>
            HEADER
            <MuiThemeProvider>
            <HashRouter>
            <Route path='/'>
            <div>
              <CharaStatus/>
            <Link to='/'>home</Link>
            <Link to='/hoge'>hoge</Link>
            <Link to='/fuga'>fuga</Link>
                    <h1>HOME</h1>

            <Switch>                
                <Route path='/hoge'>
                    <div>HOGE</div>
                </Route>
                <Route path='/fuga'>
                    <div>fuga</div>
                </Route>
                </Switch></div></Route>
            </HashRouter>
            </MuiThemeProvider>
        </div>);
    }
}