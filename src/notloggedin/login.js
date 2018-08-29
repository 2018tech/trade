import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state ={
      username: '',
      password: ''
    }
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  };

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  };

  onLogin(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(res => {
      switch(res.status) {
        case 200:
        this.props.setLogin(true)
        this.props.app.setState({currentPage: "Mainpage"})
        break;
        default:
      }
    })
    .catch(err => console.log('Error ', err));
  }

  render() {
    return (
      <div className="mainfrontpage">
        <Navbar>
          <Nav activeKey={1} pullLeft bsstyle="pills">
            <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
              Welcome to Giveaway
            </NavItem>
          </Nav>
          <Nav activeKey={1} pullRight bsstyle="pills">
            <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
              Home
            </NavItem>
            <NavItem eventKey={2} onSelect={()=>this.props.redirect('Register')}>
              Register
            </NavItem>
            <NavItem eventKey={2} onSelect={()=>this.props.redirect('Login')}>
              Login
            </NavItem>
          </Nav>
        </Navbar>
        <div className="lightgreen">
          <div className="container" id="lightgreen">
            <h2>Login</h2>
            <form>
              <div className="col-25">
                <label>Email:</label><br></br>
                <input type="email" onChange={e => this.onUsernameChange(e)}  ></input>
              </div>
              <div className="col-25">
                <label>Password</label><br></br>
                <input type="password" onChange={e => this.onPasswordChange(e)} ></input>
              </div>
              <button type="submit" onClick={e => this.onLogin(e)} className="btn btn-default">Login</button>
            </form>
          </div>
          <div className="loginbelow"></div>
        </div>
      </div>
    );
  }
}
