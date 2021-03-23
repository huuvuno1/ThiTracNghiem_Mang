import React, { Component } from 'react';
import Answer from './Answer';
import data from './data.json';
function reset()
{
    var inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++)
        inputs[i].checked = false;
}

function getIDSave()
{
    let id = localStorage.getItem("saved");
    if (id == null)
        id = 1;
    id = Number(id);
    return id;
}
class Question extends Component {
    constructor(props) {
        super(props);
        let idSave = getIDSave();
        this.state = {
            id: idSave,
            question: "",
            answers: ["", "", "", ""],
            result: 0,
            loop: true,
            isClicked: false,
            isSelect: false
        }
    }


    getQuestion = (id) => {
        for (let i = 0; i < data.length; i++){
            if (i === id) {
                this.setState({
                    id: i,
                    question: data[i].question,
                    answers: [data[i].answers[0], data[i].answers[1], data[i].answers[2], data[i].answers[3]],
                    result: data[i].result,
                    loop: false
                });
                return data[i];
            }
        }
        
    }

    nextQuestion = () => {
        var x = this.state.id;
        if (x === 106)
            x = 0;
        this.setState({
            id: x + 1,
            loop: true,
            isClicked: false
        });
        reset()
    }

    backQuestion = () => {
        var x = this.state.id;
        if (x === 1)
            x = 107;
        this.setState({
            id: x - 1,
            loop: true,
            isClicked: false
        });
        reset()
    }

    randomQuestion = () => {
        var x = Math.floor((Math.random() * 100) + 6);
        while (x === this.state.id)
        {
            x = Math.floor((Math.random() * 100) + 6);
        }
        if (x > 106 || x < 1)
            x = 1;
        this.setState({
            id: x,
            loop: true,
            isClicked: false
        });
        reset()
    }

    checkAnswer = (ans) => {
        var isSelected =  this.state.result === ans ? true : false;
        this.setState({
            isSelect: isSelected,
            isClicked: true
        })

    }

    showResult = (x) => {
        //let warn = this.state.id === 77 ? "Đáp án này đã được sửa lại khác với tài liệu (Anycast là sai) !" : "";
        if (this.state.isClicked)
            return (
                <div className="result">
                    <p>Câu trả lời của bạn: <i className="y_n">{this.state.isSelect ? "Đúng" : "Sai"} </i></p>
                    <p id="p">Đán án: <b>{this.state.answers[this.state.result]}</b></p>
                    {/* <p className="y_n">{warn}</p> */}
                    <i>Có thể click đáp án khác để test lại</i>
                </div>
            )    
    }

    render() {
        if (this.state.loop)
            this.getQuestion(this.state.id);
        return (
            <div className="form">
                <div className="question">
                    <b><i id>Câu <i id="qs_id">{this.state.id}</i>: </i> <i>{this.state.question}</i></b>
                </div>
                <div className="answer">
                    <Answer id={0} check={() => this.checkAnswer(0)} valueIndex={0} value={this.state.answers[0]}/>
                    <Answer id={1} check={() => this.checkAnswer(1)} valueIndex={1} value={this.state.answers[1]}/>
                    <Answer id={2} check={() => this.checkAnswer(2)} valueIndex={2} value={this.state.answers[2]}/>
                    <Answer id={3} check={() => this.checkAnswer(3)} valueIndex={3} value={this.state.answers[3]}/>
                </div>
                
                {this.showResult(1)}

                <div className="btn_move">
                    <button className="btn_move1" onClick={() => this.backQuestion()}>Câu trước</button>
                    <button className="btn_move3" onClick={() => this.randomQuestion()}>Ngẫu nhiên</button>
                    <button className="btn_move2" onClick={() => this.nextQuestion()}>Câu sau</button>
                </div>
            </div>

        );
    }
}

export default Question;
