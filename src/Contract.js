import React, { Component } from 'react';
import logo from './grappa.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completionEta: "",
      supervision: "",
      misc: ""
    }
  }

  componentDidMount() {
    document.title = "Grappa: Contract page";
  }

  handleContractChange = (event) => {
    console.log("handler called " + event.target.name + " " + event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  sendForm = (event) => {
    
    axios.post('/api/contract',{
      completionEta: this.state.completionEta,
      supervision: this.state.supervision,
      misc: this.state.misc
    })
      .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {console.error(error)});
    console.log("Nappia painettiin.");
  }

  render() {
    return (
      <div className="Contract">
        <div className="Contract-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Thesis Contract</h2>
        </div>
        <h2>Gradusopimus tehdään gradunohjauksen alkaessa</h2>
        <p className="Contract-intro">
          Sopimusta voidaan muuttaa osapuolten yhteisestä päätöksestä.
          </p>
        <textarea ref="input" placeholder="arvioitu gradun valmistumisen aikataulu" type="text" name="completionEta" value={this.state.completionEta} onChange={this.handleContractChange} /> <br />
        <br />
        <textarea ref="input" placeholder="ohjauksen määrän ja laadun yksityiskohdat" type="text" name="supervision" value={this.state.supervision} onChange={this.handleContractChange} /> <br />
        <br />
        <textarea ref="input" placeholder="muut sovittavat asiat" type="text" name="misc" value={this.state.misc} onChange={this.handleContractChange} /> <br />
        <br />
        <input type="submit" value="send" onClick={this.sendForm} />




        <br />
        <Link to="/"> Go back to HomePage :P </Link>
      </div>
    );
  }
}

export default Contract;
