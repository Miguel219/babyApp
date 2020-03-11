import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';
import * as selectors from '../../reducers';
import * as actionsBabies from '../../actions/babies';
import * as actions from '../../actions/events';

const eventTypes = ['Siesta', 'Pacha', 'Cambio de pañal (popo)', 'Cambio de pañal (pipi)', 'Pecho']

const EventBabies = ({ babies, events, selectedBaby, onClick, onSubmit, onChangeBaby }) => {
  const [eventTypeSelect, changeEventTypeSelect] = useState('');
  const [notesInput, changeNotesInput] = useState('');
  return (
    <div className="event-babies">
        <div className="event-babies-info">
          <div className="event-babies-baby-container">
            <select id="babiesSelect"  defaultValue={(selectedBaby === null) ? ('DEFAULT') : (selectedBaby)} className="event-babies-select"
              onChange={e => onChangeBaby(e.target.value)}  >
              <option value="DEFAULT" disabled hidden>
                {'Selecciona un bebe'}
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
          {(selectedBaby === null)
          ? (
          <div/>
          ) : (events[selectedBaby] === undefined)
          ? (
          <div/>
          ) : (
          events[selectedBaby].map((event) => (
            <div key={event.eventId} className="event-babies-event" >
              <div className="event-babies-event-delete" >
                <button className="event-babies-event-delete-button" onClick={() => 
                  onClick(selectedBaby, event.eventId)}>
                  {'x'}
                </button>
              </div>
              <label className="event-babies-event-label">
                {'Fecha: ' + new Date(event.date).toLocaleString()}
              </label>
              <label className="event-babies-event-label">
                {'Tipo: ' + eventTypes[event.type]}
              </label>
              <label className="event-babies-event-label">
                {'Notas: ' + event.notes}
              </label>
            </div>
              ))
          )}
        </div>
        <div className="event-babies-form">
          <h2>
            {'Nuevo Evento'}
          </h2>
          <br/>
          <div className="event-babies-select-label">
            <label>
              {'Tipo:'}
            </label>
          </div>
          <select defaultValue='DEFAULT' className="event-babies-select"
            onChange={e => changeEventTypeSelect(e.target.value)} >
            <option value="DEFAULT" disabled hidden>
              {'Selecciona un eveto'}
            </option>
            {eventTypes.map((event, id) => (
              <option key={id} value={id}>
                {event}
              </option>
              ))}
          </select>
          <br/>
          <textarea className="event-babies-form-textarea"
            rows="6"
            placeholder="Notas:"
            value={notesInput}
            onChange={e => changeNotesInput(e.target.value)}
          />
          <br/>
          <button type="submit" className="event-babies-form-button" onClick={
            () => onSubmit(selectedBaby, eventTypeSelect, notesInput)
          }>
            {'Crear'}
          </button>
        </div>
    </div>
  );
} 


export default connect(
  state => ({
    babies: selectors.getBabies(state),
    events: selectors.getEvents(state),
    selectedBaby: selectors.getSelectedBaby(state),
  }),
  dispatch => ({
    onClick(babyId, eventId) {
      dispatch(actions.deleteEvent(babyId, eventId));
    },
    onSubmit(babySelect, eventTypeSelect, notesInput) {
      (babySelect==="") ?
      alert("Selecciona un bebe para continuar")
      : (eventTypeSelect==="") ?
      alert("Selecciona un tipo de evento para continuar")
      : (notesInput==="") ?
      alert("Ingresa notas al evento para continuar")
      : dispatch(actions.addEvent(babySelect, uuidv4(), eventTypeSelect, notesInput, new Date()));
    },
    onChangeBaby(babyId) {
      dispatch(actionsBabies.selectBaby(babyId));
    },
  }),
)(EventBabies);
