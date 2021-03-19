import React, { Component } from 'react';

class Answer extends Component {
    render() {
        return (
            <p>
                <input checked={this.props.checked} type="radio" onChange={this.props.check} name="answer" id={"ans" + this.props.id} value={this.props.valueIndex}/> 
                <label htmlFor={"ans" + this.props.id}> {this.props.value}</label>
            </p>
        );
    }
}

export default Answer;