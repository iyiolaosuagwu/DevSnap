import React, { Component } from 'react'
import './Register.css';
import { connect } from 'react-redux'; 
import { registerUser } from '../../actions/authActions';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFeildGroup from '../common/TextFeildGroup';

import classnames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  // disallow users to access register page if login
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  // this runs when ur component receives new properties
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onChange = (e) => {
    // selecting all name attribute and setting it to value passed into the input
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {  

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    
    e.preventDefault();
    // every action we bring in, will be called with props
    this.props.registerUser(newUser, this.props.history);
  }


  render() {
    const { errors } = this.state;
    
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5 col-lx-4 col-sm-4 m-auto">
              <div className="reg-pad-con">
                <h1 className="display-4 text-center auth-header-text">Devsnap</h1>
                <p className="lead text-center auth-sub-text">Create your DevConnector account</p>
                <form noValidate onSubmit={this.onSubmit}>
                  
                  <TextFeildGroup name="name" type="name" placeholder="Name" onChange={this.onChange} value={this.state.name} error={errors.name} />


                  <TextFeildGroup name="email" type="email" placeholder="Email Address" onChange={this.onChange} value={this.state.email} error={errors.email} />


                  <TextFeildGroup name="password" type="password" placeholder="Password" onChange={this.onChange} value={this.state.password} error={errors.password} />

                  <TextFeildGroup name="password2" type="password2" placeholder="Password2" onChange={this.onChange} value={this.state.password2} error={errors.password2} />


                  <input type="submit" value="Register" className="auth-btn btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

// state.auth & state.errors, comes from the route reducer
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));