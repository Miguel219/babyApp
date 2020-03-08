import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/babies';


const AddBaby = ({ hasBabies, onSubmit }) => {
  const [nameInput, changeNameInput] = useState('');
  const [lastNameInput, changeLastNameInput] = useState('');
  return (
    <div className="form-add-baby">
        <div className="form-add-baby-container">
        {
          hasBabies ? (
            <h1 className="form-add-baby-title">
              {'Nuevo bebe'}
            </h1>
          ) : (
            <h1 className="form-add-baby-title">
              {'No hay bebes'}
            </h1>
          )
        }
        <h3>
          {'Ingresa los datos de tu bebe:'}
        </h3>
        <input className="form-add-baby-input"
          type="text"
          placeholder="Nombre"
          value={nameInput}
          onChange={e => changeNameInput(e.target.value)}
        />
        <input className="form-add-baby-input"
          type="text"
          placeholder="Apellido"
          value={lastNameInput}
          onChange={e => changeLastNameInput(e.target.value)}
        />
        <br/>
        <button type="submit" className="form-add-baby-button" onClick={
          () => onSubmit(nameInput, lastNameInput)
        }>
          {'Crear'}
        </button>
      </div>
    </div>
  );
} 


export default connect(
  state => ({
    hasBabies: selectors.getBabies(state).length !== 0,
  }),
  dispatch => ({
    onSubmit(nameInput, lastNameInput) {
      (nameInput==="") ?
      alert("Ingresa el nombre del bebe para continuar")
      : (lastNameInput==="") ?
      alert("Ingresa el apellido del bebe para continuar")
      : dispatch(actions.addBaby(uuidv4(), nameInput, lastNameInput));
    },
  }),
)(AddBaby);
