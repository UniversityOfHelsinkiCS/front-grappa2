import React, { Component } from 'react';
import FormField from './FormField';

export default class Section extends Component {
    render() {
        const fieldList = this.props.elements.map(
            (fieldData, fieldKey) => (
                <FormField
                    fieldKey={fieldKey}
                    fieldData={fieldData}
                    fieldOnChangeFunc={this.props.fieldOnChangeFunc}
                />));

        return (
            <div key={`section${this.props.sectionKey}`}><br />
                <h1 className="ui dividing header">{this.props.header}</h1>
                {fieldList}
            </div>
        )
    }
}
