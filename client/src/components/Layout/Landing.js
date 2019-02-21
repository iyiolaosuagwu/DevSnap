import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Landing extends Component {

  // disallow users to access login page if login
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    console.log(this.props.auth.isAuthenticated)
  }

  render() {
    
    return (
      <div style={{marginTop: '100px'}}>
        Landing
      </div>
    )
  }
}

Landing.prototype = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
