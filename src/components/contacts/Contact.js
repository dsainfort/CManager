import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Consumer} from '../../context';


export default class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDelete = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({type: 'DELETE_CONTACT', payload: id});
    } catch (e) {
      dispatch({type: 'DELETE_CONTACT', payload: id});
    }
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
                <i onClick={this.onDelete.bind(this, id, dispatch)} 
                  className="fa fa-times" 
                  style={
                    {cursor: 'pointer', 
                      float: 'right', 
                      color: 'red'
                    }
                  }
                />
                <Link to={`contact/edit/${id}`}>
                  <i className="fa fa-pencil-alt" 
                  style={
                      {
                        cursor: 'pointer',
                        float: 'right',
                        color: 'black',
                        marginRight: '1rem'
                      }
                    }></i>
                </Link>

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
