import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LogoutButton from 'components/Buttons/Logout.js';

import { connect } from 'react-redux'
import { fetchUser } from '../actions'

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({
    }),
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUser)
  }

  render() {
    const { user } = this.props;
    
    return (
      <div>
         <h1>USER PROFILE</h1>
          <p>{JSON.stringify(user)}</p>   
          <LogoutButton/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile)
