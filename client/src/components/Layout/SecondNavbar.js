import React, { Component } from 'react'
import './second.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../actions/authActions';




class SecondNavbar extends Component {

   onLogoutClick(e){
      e.preventDefault();
      
      this.props.logoutUser();
   }

   render() {
     
   const { isAuthenticated, user } = this.props.auth;
      
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
            <Link className="navbar-brand" to="/dashboard">Devsnap</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
               <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
               <ul className="navbar-nav mr-auto">
                  
               </ul>

               <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                         <a href="#" className="nav-link" onClick={this.onLogoutClick.bind(this)}>
                            <img className="image-circle" src={user.avater} alt={user.name}/>
                        </a>
                  </li>
               </ul>
            </div>
            </div>
         </nav>
      </div>
    )
  }
}


SecondNavbar.propTypes = {
   logotUser: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, {logoutUser}) (SecondNavbar);
