import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'; 
import { loginUser } from '../../actions/authActions';
import TextFeildGroup from '../common/TextFeildGroup';

// CSS
import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  // disallow users to access login page if login
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  // this runs when ur component receives new properties
  componentWillReceiveProps(nextProps) {
    // check to see if isAuthenticated is full/ it is true
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }


  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
  
    const loggedUser = {
      email: this.state.email,
      password: this.state.password
    }
        
    this.props.loginUser(loggedUser);
    e.preventDefault();
  }


  render() {

    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row ">
            <div className="col-lg-3 col-md-5 col-lx-4 col-sm-4 mx-auto">
              <div className="pad-con">
                <h1 className="display-4 text-center auth-header-text">Devsnap</h1>
                <p className="text-center auth-sub-text">please login into your account.</p>
                <form onSubmit={this.onSubmit}>
                  
                  <TextFeildGroup name="email" type="email" placeholder="Email Address" onChange={this.onChange} value={this.state.email} error={errors.email} />
                  

                  <TextFeildGroup name="password" type="password" placeholder="Password" onChange={this.onChange} value={this.state.password} error={errors.password}/>

                  <input type="submit" value="Login" className="auth-btn btn-block mt-3" />
                </form>
                <div className="text-center mt-3">
                  <Link to="/forget" className="text-center auth-a-link text-pad">forget password?</Link>
                  <p className="text-center auth-sub-text text-pad">Dont have an account</p>
                  <Link to="/register" className="auth-btn btn-block mt-3">Creat an account</Link>
                  <p className=""></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser }) (Login);