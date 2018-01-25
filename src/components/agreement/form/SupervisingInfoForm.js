import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { personType } from '../../../util/types';

export default class SupervisingInfoForm extends Component {
    constructor() {
        super();
        this.state = {
            chosenStudyfield: -1,
            selectedSupervisors: { thesisSupervisorMain: -1, thesisSupervisorSecond: -1 }
        }
    }

    field = (label, formName) => (
        <div>
            <br />
            <b>{label}</b>
            <div className="ui fluid input">
                <input type="text" name={formName} onChange={this.props.handleChange} />
                {(Object.keys(this.props.requiredFields).includes(formName) && !this.props.requiredFields[formName]) ?
                    (<div className="ui left pointing red basic label">
                      Täytä ohjaajan tiedot
                     </div>) : ''}
            </div>
        </div>
    )

    sendDropDownChange = (event) => {
        if (event.target.value) {
            const list = Object.assign({}, this.state.selectedSupervisors);
            list[event.target.name] = event.target.value;
            this.setState({ selectedSupervisors: list });
            this.props.handleChange(event);
        }
    }

    programmeChange = (event) => {
        if (event.target.value) {
            this.setState(
                {
                    chosenStudyfield: Number(event.target.value),
                    selectedSupervisors: { thesisSupervisorMain: -1, thesisSupervisorSecond: -1 }
                }
            );
            this.props.resetSupervisors();
            this.props.handleChange(event);
        }
    }

    programmeSelecter = list => (
        <div>
            <b>Valitse ensin gradun aine</b>
            <div>
                <select className="ui dropdown" name="programmeId" onChange={this.programmeChange}>
                    <option value={-1}>Valitse ensin gradun tieteenala</option>
                    {list.map(obj => <option key={obj.id} value={obj.id}>{obj.text}</option>)}
                </select>
                {(Object.keys(this.props.requiredFields).includes('programmeId') && !this.props.requiredFields.programmeId) ?
                    (<div className="ui left pointing red basic label">
                      Valitse oppiaine
                     </div>) : ''}
            </div>
        </div>
    )

    supervisorSelecter = (label, placeholder, formName, list) => (
        <div>
            <b>{label}</b>
            <div>
                <select className="ui dropdown" value={this.state.selectedSupervisors[formName]} disabled={list[0] === undefined} onChange={this.sendDropDownChange} name={formName}>
                    <option value={-1}>{placeholder}</option>
                    {list.map(obj => <option key={obj.id} value={obj.id}>{obj.text}</option>)}
                </select>
                {(Object.keys(this.props.requiredFields).includes(formName)) && !this.props.requiredFields[formName] ?
                    (<div className="ui left pointing red basic label">
                      Valitse ohjaaja
                     </div>) : ''}
            </div>
        </div>
    )

    getSupervisorData = () => {
        if (this.state.chosenStudyfield === -1)
            return [];
        return this.props.supervisors.filter(supervisor => supervisor.programmeId === this.state.chosenStudyfield).map(supervisor => ({
            id: supervisor.personRoleId,
            text: `${supervisor.person.title} ${supervisor.person.firstname} ${supervisor.person.lastname} ${supervisor.person.email}`
        }));
    }

    render() {
        const supervisors = this.getSupervisorData();
        return (
            <div>
                <h1>Ohjausvastuut</h1>
                {this.programmeSelecter(this.props.programmes.map(field => ({ id: field.programmeId, text: field.name })))}
                <br />
                {this.supervisorSelecter('Vastuuohjaaja', 'Valitse ohjaaja', 'thesisSupervisorMain',
                    supervisors.filter(s => s.id !== this.state.selectedSupervisors.thesisSupervisorSecond))}
                <br />
                {this.supervisorSelecter('Toinen ohjaaja', 'Valitse ohjaaja', 'thesisSupervisorSecond',
                    supervisors.filter(s => s.id !== this.state.selectedSupervisors.thesisSupervisorMain))}
                {this.field('Muu ohjaaja', 'thesisSupervisorOther')}
            </div>
        )
    }
}

const { func, shape, number, string, arrayOf } = PropTypes;
SupervisingInfoForm.propTypes = {
    resetSupervisors: func.isRequired,
    handleChange: func.isRequired,
    programmes: arrayOf(shape({
        programmeId: number,
        name: string
    })).isRequired,
    supervisors: arrayOf(shape({
        programmeId: number,
        person: personType
    })).isRequired
};
