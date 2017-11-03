import React, { Component } from "react";

export default class GraderEditor extends Component {
    constructor() {
        super();
        this.state = {
            newGrader: { name: "", title: "" },
            updateGrader: { id: undefined, name: "", title: "" }
        };
    }

    getTitles = () => {
        return ["Prof.", "Assistant Prof.", "Adjunct Prof.", "Dr.", "Other"];
    }

    handleChange = (field, formname) => (event) => {
        const value = event.target.value;
        this.setState({ [formname]: { ...this.state[formname], [field]: value } })
    }

    selectGrader = (event) => {
        const updateGrader = this.props.graders.find(grader => grader.id.toString() === event.target.value);
        if (!updateGrader) return;
        this.setState({ updateGrader });
    }

    saveNewGrader = () => {
        const grader = this.state.newGrader;
        console.log("saving");
        console.log(grader);
        this.props.saveGrader(grader);
    }

    updateGrader = () => {
        const grader = this.state.updateGrader;
        console.log("updating");
        console.log(grader);
        this.props.updateGrader(grader);
    }

    //not functioning yet in Grappa 2, to be added later
    deleteGrader = () => {
        const grader = this.state.updateGrader;
        console.log("deleting");
        console.log(grader);
        //this.props.deleteGrader(grader);
    }

    renderCreate() {
        console.log(this.state);
        return (
            <div className="three fields">
                <div className="ui field">
                    <label>Title</label>
                    <select
                        className="ui fluid search dropdown"
                        value={this.state.newGrader.title}
                        onChange={this.handleChange("title", "newGrader")}
                    >

                        <option value="">Select title</option>
                        {this.getTitles().map((title, index) => <option key={index} value={title}>{title}</option>)}
                    </select>
                </div>
                <div className="ui field">
                    <label>Name</label>
                    <input
                        type="text"
                        value={this.state.newGrader.name}
                        placeholder="Name"
                        onChange={this.handleChange("name", "newGrader")}
                    />
                </div>
                <div className="ui field">
                    <label>&nbsp;</label>

                    <button className="ui green button" onClick={this.saveNewGrader}>
                        Create Supervisor
          </button>
                </div>
            </div>
        );
    }

    renderUpdate() {
        return (
            <div className="four fields">
                <div className="field">
                    <label>Who</label>
                    <select className="ui fluid search dropdown" onChange={this.selectGrader}>
                        <option value="">Select grader</option>
                        {this.props.graders.map((grader, index) =>

                            <option key={index} className="item" value={grader.id}>
                                {grader.title}&nbsp;&nbsp;{grader.name}
                            </option>
                        )}
                    </select>
                </div>
                <div className="field">
                    <label>Title</label>
                    <select
                        className="ui fluid search dropdown"
                        value={this.state.updateGrader.title}
                        onChange={this.handleChange("title", "updateGrader")}
                    >
                        {this.getTitles().map((title, index) => <option key={index} value={title}>{title}</option>)}
                    </select>
                </div>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        value={this.state.updateGrader.name}
                        placeholder="Name"
                        onChange={this.handleChange("name", "updateGrader")}
                    />
                </div>
                <div className="field">
                    <label>&nbsp;</label>
                    <button className="ui blue button" onClick={this.updateGrader}>
                        Update Supervisor
          </button>
                </div>
                
            </div>
        );
    }

    render() {
        return (
            <div className="ui form">
                {this.renderCreate()}
                {this.renderUpdate()
                }
            </div>
        );
    }
}