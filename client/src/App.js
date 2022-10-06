import React, {useEffect, useState} from 'react'
import { CookiesProvider } from 'react-cookie';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: 'declint', password: 'nada123'}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  async doLogin(login_data)
  {
    const opts = {
      method: 'POST',
      body: JSON.stringify(login_data),
      headers: { 'Content-Type': 'application/json' }
    }

//    const resp = await fetch("/api/login?username="+login_data.username);
    const resp = await fetch("/api/login", opts);
    console.log(resp)
    const resp_json = await resp.json();
    return resp_json;
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    //alert('Username:' + this.state.username + " ,password:" + this.state.password);
    
    const logindata = await this.doLogin(this.state);

    console.log("Logindata:")
    console.log(logindata)

    this.props.parentCallback(logindata);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        <br></br>
        
        <label>
          Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {backendData: 'Inte fått nån data ännu...'}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      backendData: event
    });
  }

  componentDidMount() {
    fetch("/api").then(
      response => {
        console.log(response);
        return response.json()
      }

    ).then(
      data => {
        //setBackendData(data)
        console.log("Mos");
      }
    )

    console.log("Testa lite output")
  }

  handleCallbackFromLogin = (childData) =>
  {
    console.log(childData)
    this.setState({backendData: childData.superkaka})
  }

  render() {
    return (
    <div>
      <p><b>Kaka jag fått:</b> {this.state.backendData}</p>     
      <LoginForm parentCallback = {this.handleCallbackFromLogin}/>
    </div>
    )
  }
}

export default App