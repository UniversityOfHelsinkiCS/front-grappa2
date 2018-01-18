import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PersonRoleReviewModal from '../../components/person/PersonRoleReviewModal';

export class PersonRoleReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agreementPersons: this.filterAndFormatPersons(props),
            personRoleInReview: undefined
        }
    }

    componentDidMount() {
        document.title = 'Grader Management';
    }

    componentWillReceiveProps(newProps) {
        if (newProps.agreements.length > 0 && newProps.roles.length > 0 && newProps.persons.length > 0 && newProps.theses.length > 0) {
            this.setState({
                agreementPersons: this.filterAndFormatPersons(newProps),
                personToBeReviewed: undefined,
                showReviewModal: false
            });
        }
    }

    filterAndFormatPersons = (props) => {
        const agreementPersons = props.roles.filter(role => role.name === 'grader')
            .map((role) => {
                const person = props.persons.find(p => p.personId === role.personId)
                if (!person) {
                    return undefined;
                }
                return {
                    personId: person.personId,
                    personRoleId: role.personRoleId,
                    name: `${person.firstname} ${person.lastname}`,
                    role: role.name,
                    statement: role.statement,
                    approval: role.approval,
                    programme: props.programmes.find(programme => programme.programmeId === role.programmeId).name,
                    thesis: props.theses.find((thesis) => {
                        return props.agreements.find(agreement =>
                            thesis.thesisId === agreement.thesisId && role.agreementId === agreement.agreementId
                        )
                    })
                }
            })
        return agreementPersons
    }

    reviewAgreementPerson = (statement, approval, personRole) => {
        if (statement && personRole) {
            const agreementPersonRole = this.props.roles.find(role => role.personRoleId === personRole.personRoleId);
            agreementPersonRole.statement = statement;
            agreementPersonRole.approval = approval;
            this.props.reviewAgreementPerson(agreementPersonRole);
            this.setState({ showReviewModal: false })
        }
    }

    toggleEditModal = personRoleToReview => () => {
        this.setState({ personRoleInReview: personRoleToReview });
    }

    renderReviewButton(rolePerson) {
        const text = rolePerson.approved ? 'Approved' : 'Review';
        const buttonClass = `ui green button ${rolePerson.approved ? 'disabled' : ''}`;
        return (
            <button className={buttonClass} onClick={this.toggleEditModal(rolePerson)} >
                {text}
            </button>
        )
    }

    renderList() {
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Person</th>
                        <th>Programme</th>
                        <th>Role</th>
                        <th>Thesis</th>
                        <th>Action, if needed</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.agreementPersons.map(rolePerson => (
                        <tr key={parseInt(`${rolePerson.personRoleId}${rolePerson.thesis.thesisId}`, 10)}>
                            <td>{rolePerson.name}</td>
                            <td>{rolePerson.programme}</td>
                            <td>{rolePerson.role}</td>
                            <td>{rolePerson.thesis.title}</td>
                            <td>{this.renderReviewButton(rolePerson)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className="ui segment">
                <PersonRoleReviewModal
                    closeModal={this.toggleEditModal}
                    personRole={this.state.personRoleInReview}
                    sendReview={this.reviewAgreementPerson}
                />
                Add and edit supervisor list here or review thesis projects. This page will be displayed to programmes&lsquo; professors and admins only.
                <h2>List of thesis supervisors </h2>
                {this.renderList()}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    reviewAgreementPerson(data) {
        dispatch(data) // reviewAgreementPerson(data));
    }
});

const mapStateToProps = state => ({
    theses: state.theses,
    agreements: state.agreements,
    user: state.user,
    roles: state.roles,
    persons: state.persons,
    programmes: state.programmes
})

const { func } = PropTypes;
PersonRoleReviewPage.propTypes = {
    reviewAgreementPerson: func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonRoleReviewPage);