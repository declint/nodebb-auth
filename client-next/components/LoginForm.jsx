import React,{ useState, useEffect } from 'react';
import {usePageDataStore} from '../lib/storepagedata'
import {PacmanLoader} from 'react-spinners'
import axios from 'axios'

class LoginForm extends React.Component
{
    constructor() {
        super();
        this.state = {
            showpacman: false,
            korvmedmos: 67
        };

        // Binding method
        this.submitContact = this.submitContact.bind(this);
    }

    changestuff()
    {
        //const changedata = usePageDataStore.subscribe(() => {}, state => state.pagedata)
        usePageDataStore.setState({pagedata: "ny data på gång!"})
        console.log("changing data...")
    }
    
    render() {
        const {showpacman} = this.state;
    return (
    <div>
        <PacmanLoader color="#36d7b7" loading={showpacman}/>
        <form onSubmit={this.submitContact}>
        <label>
            Username:
            <input type="text" name="username" defaultValue="mattias.klint@combient.com"/>
        </label>

        <br/>
        <label>
            Password:
            <input type="password" name="password" defaultValue="nada123"/>
        </label>

        <br/>
        <input type="submit" value="Submit form" />
        </form>
    </div>
    )}

    async sendlogin(login_data)
    {
        let res = await axios.post("/api/login", login_data);
        const { data } = res;
        console.log("🚀 ~ file: LoginForm.jsx ~ line 53 ~ data", data)
        return data.superkaka;
    }

    async submitContact(event)
    {
        event.preventDefault();

        this.setState({showpacman: true});

        const login_data = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        const loginresp = await this.sendlogin(login_data)
        console.log("🚀 ~ file: LoginForm.jsx ~ line 73 ~ loginresp", loginresp)        

        //Store cookie to page store
        usePageDataStore.setState({pagedata: loginresp})

        setTimeout(() => {
            this.setState({showpacman: false});
        }, 2000);
    }
}



export default LoginForm
