import React, { Component } from 'react';
import FormField from './FormField';

export default class Section extends Component {
    constructor() {
        super();
        this.state = {
            sectionKey: "",
            header: "",
            elements: [],
        }
    }
    
    render() {

        let fieldList = this.props.elements.map(
            (fieldData, fieldKey) => {

                return <FormField fieldKey={fieldKey} fieldData={fieldData} fieldOnChangeFunc={this.props.fieldOnChangeFunc} />;

            });


        return (
            <div key={"section" + this.props.sectionKey}><br />
                <h3 className="ui dividing header">{this.props.header}</h3>
                {fieldList}
            </div>
        )
    }
}

//<FormSection sectionKey={"form" + sectionKey} header={sectionData.header} elements={sectionData.fields} />;