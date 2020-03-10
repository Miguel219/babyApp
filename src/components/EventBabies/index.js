import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/babies';


const EventBabies = ({ babies, onSubmit }) => {
  return (
    <div className="event-babies">
        <div className="event-babies-info">
          <label >
            {'Bebe'}
          </label>
          <div className="event-babies-baby-container">
            <select id="babiesSelect" defaultValue='DEFAULT' className="event-babies-select">
              <option value="DEFAULT" disabled hidden>
                {'Selecciona una opción'}
              </option>
              {babies.map((baby) => (
              <option key={baby.id} value={baby.id}>
                {baby.name + ' ' + baby.lastName}
              </option>
              ))}
            </select>
            <Link to='/createBaby' >
              <button className="event-babies-add-baby-button">
                {'+'}
              </button>
            </Link>
          </div>  
        </div>
        <div className="event-babies-form">
        
        </div>
    </div>
  );
} 


export default connect(
  state => ({
    babies: selectors.getBabies(state),
  }),
  dispatch => ({
    onSubmit() {
      dispatch(actions.addBaby(uuidv4(), 'hola', 'laskd'));
    },
  }),
)(EventBabies);
