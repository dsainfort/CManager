import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Consumer} from '../../context';

export default class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDelete = (id, dispatch) => {
    dispatch({type: 'DELETE_CONTACT', payload: id});
  }
  
  render() {
    const { id, name, email, phone } = this.props.contact
    const {showContactInfo} = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name} {' '}
                <i onClick={() => this.setState({showContactInfo: !this.state.showContactInfo})} className="fa fa-sort-down" style={{cursor: 'pointer'}}/> 
                <i onClick={this.onDelete.bind(this, id, dispatch)} className="fa fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}}/>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          )
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
};
