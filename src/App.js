import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    user: {
      email: '',
      password: '',
      username: ''
    },
    authenticated: false
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/register', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(this.state.user)
      });
      const user = await response.json() ;
        if(user) {
          localStorage.setItem('token', user.token)
          this.setState({user: { email: '', password: '', username: ''}, authenticated: true})
        }
    } catch(e) {
      console.log('There was an error working on this', e)
    }
  }

  handleOnChange = ({target: { name, value }}) => {
    this.setState({user: { ...this.state.user, [name]: value }});
  }

  render() {
    const { user: { email, password, username }, authenticated} = this.state;

    return (
      <div className="App jumbotron">
        <h3>Sign Up Form</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" value={email} type="text"  onChange={this.handleOnChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password"  value={password} onChange={this.handleOnChange} type="password" className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input name="username"  value={username} onChange={this.handleOnChange} type="text" className="form-control"/>
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
        { authenticated && <span className="alert alert-primary">Authenticated User</span>}
      </div>
    );
  }
}

export default App;
