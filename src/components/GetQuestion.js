import React, { Component } from "react";

class GetQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      enteredAnswer: "",
      correctAnswer: "",
      points: 0,
      getQuestion: false,
      getAnswer: false,
    };
  }

  async buttonHandler() {
    const url = await fetch("http://jservice.io/api/random");
    const response = await url.json();
    console.log(response);
    this.setState({ data: response });
    this.setState({ getQuestion: true });
  }

  answerHander(e) {
    this.setState({ enteredAnswer: e.target.value });
  }

  //   checkAnswer() {
  //     this.state.data.map((dt) => this.setState({ answer: dt.answer }));
  //     if (this.state.correctAnswer === this.state.enteredAnswer) {
  //       this.setState({ points: this.state.points + 1 });
  //     }
  //   }

  submitHandler() {
    this.state.data.map((dt) => this.setState({ answer: dt.answer }));
    if (this.state.correctAnswer === this.state.enteredAnswer) {
      this.setState({ points: this.state.points + 1 });
    } else {
      this.setState({ points: this.state.points - 1 });
    }
  }

  render() {
    return (
      <div>
        <h2>Points: {this.state.points}</h2>
        <button onClick={this.buttonHandler.bind(this)}>Get Question</button>
        {this.state.getQuestion
          ? this.state.data.map((dt) => {
              return (
                <div>
                  <p>Category: {dt.category.title}</p>
                  <p>Points: {dt.value}</p>
                  <p>Answer: {dt.question}</p>
                </div>
              );
            })
          : " "}

        {this.state.getQuestion ? (
          <form onSubmit={this.submitHandler.bind(this)}>
            <label htmlFor="answer">Insert Answer: </label>
            <input id="answer" onChange={this.answerHander.bind(this)}></input>
            <button>Submit</button>
          </form>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default GetQuestion;
