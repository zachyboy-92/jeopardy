import React, { Component } from "react";
import "./GetQuestion.css";

let answer;

class GetQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      correctAnswer: "",
      points: 0,
      getQuestion: false,
    };
  }

  async buttonHandler() {
    const url = await fetch("http://jservice.io/api/random");
    const response = await url.json();

    this.setState({ data: response });
    this.setState({ getQuestion: true });
  }

  submitHandler() {
    this.state.data.map((dt) => {
      this.setState({ correctAnswer: dt.answer });
      answer = <p className="answer-holder">{this.state.correctAnswer}</p>;
      return answer;
    });
  }

  increaseScoreHandler() {
    this.setState({ points: this.state.points + 1 });
  }

  decreaseScoreHandler() {
    this.setState({ points: this.state.points - 1 });
  }

  resetScoreHandler() {
    this.setState({ points: 0 });
  }

  render() {
    return (
      <div>
        <div className="score-container">
          <span className="score-holder">Score: </span>
          <span className="score">{this.state.points}</span>
        </div>
        <div>
          <button
            className="btn increase"
            onClick={this.increaseScoreHandler.bind(this)}
          >
            Increase
          </button>
          <button
            className="btn decrease"
            onClick={this.decreaseScoreHandler.bind(this)}
          >
            Decrease
          </button>
          <button
            className="btn reset"
            onClick={this.resetScoreHandler.bind(this)}
          >
            Reset
          </button>
        </div>
        <h3 className="play-header">Let's Play</h3>
        <button
          className="btn question-btn"
          onClick={this.buttonHandler.bind(this)}
        >
          Get Question
        </button>
        {this.state.getQuestion
          ? this.state.data.map((dt) => {
              return (
                <div className="question-container" key={dt.id}>
                  <div className="question-holder">
                    <span className="holder">Category: </span>
                    <span className="question">{dt.category.title}</span>
                  </div>

                  <div className="question-holder">
                    <span className="holder">Points: </span>
                    <span className="question">{dt.value}</span>
                  </div>

                  <div className="question-holder">
                    <span className="holder">Answer: </span>
                    <span className="question">{dt.question}</span>
                  </div>
                </div>
              );
            })
          : " "}

        <button
          className="btn answer-btn"
          onClick={this.submitHandler.bind(this)}
        >
          Submit
        </button>
        {answer}
      </div>
    );
  }
}

export default GetQuestion;
