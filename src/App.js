import React, { Component } from "react";
import "./App.scss";

const CalculatorOperations = {
  "/": (prevValue, nextValue) => prevValue / nextValue,
  "*": (prevValue, nextValue) => prevValue * nextValue,
  "+": (prevValue, nextValue) => prevValue + nextValue,
  "-": (prevValue, nextValue) => prevValue - nextValue,
  "=": nextValue => nextValue
};

class App extends Component {
  state = {
    displayNb: "0",
    value: 0,
    prevNb: null,
    nextNb: null,
    operator: null,
    operatorClicked: false
  };

  onDigitKeyClick(nb) {
    const { displayNb, operatorClicked, prevNb } = this.state;
    if (prevNb) {
      if (operatorClicked) {
        this.setState({ displayNb: nb, nextNb: nb, operatorClicked: false });
      } else {
        displayNb === "0"
          ? this.setState({ displayNb: nb, nextNb: nb })
          : this.setState(prevState => ({
              displayNb: prevState.displayNb.concat(nb),
              nextNb: prevState.displayNb.concat(nb)
            }));
      }
    } else {
      if (operatorClicked) {
        this.setState({ displayNb: nb, operatorClicked: false });
      } else {
        displayNb === "0"
          ? this.setState({ displayNb: nb })
          : this.setState(prevState => ({
              displayNb: prevState.displayNb.concat(nb)
            }));
      }
    }
  }

  onDotClick() {
    const { displayNb, operatorClicked } = this.state;
    if (operatorClicked) {
      this.setState({ displayNb: "0.", operatorClicked: false });
    } else {
      if (!displayNb.includes(".")) {
        this.setState(prevState => ({
          displayNb: prevState.displayNb.concat(".")
        }));
      }
    }
  }

  onPlusMnClick() {
    const { displayNb } = this.state;
    displayNb.charAt(0) === "-"
      ? this.setState({ displayNb: displayNb.substr(1) })
      : this.setState({ displayNb: "-" + displayNb });
  }

  onOperatorClick(op) {
    const { prevNb, displayNb } = this.state;
    if (prevNb) {
      this.onEqual();
      console.log("operator added"); // Problem
    }
    const nb = parseFloat(displayNb);
    this.setState({
      operatorClicked: true,
      operator: op,
      prevNb: nb
    });
  }

  onClear() {
    const { prevNb } = this.state;
    if (!prevNb) {
      this.setState({ displayNb: "0" });
    } else {
      this.setState({ prevNb: null });
    }
  }

  onPercent() {
    const { displayNb } = this.state;
    const percentNb = parseFloat(displayNb / 100);
    this.setState({ displayNb: percentNb });
  }

  onEqual() {
    const { displayNb } = this.state;
    const nb = parseFloat(displayNb);
    this.setState({ nextNb: nb });
    const { prevNb, nextNb, operator } = this.state;
    const value = parseFloat(prevNb);
    const nextValue = parseFloat(nextNb);
    const result = CalculatorOperations[operator](value, nextValue);
    this.setState({
      displayNb: result,
      prevNb: null,
      nextNb: null,
      operator: null
    });
  }

  render() {
    const { displayNb, prevNb } = this.state;
    return (
      <div>
        <div className="calculator">
          <div className="calc-display">{displayNb}</div>
          <div className="calc-commands">
            <button className="fn-keys key-ac" onClick={() => this.onClear()}>
              {prevNb ? "C" : "AC"}
            </button>
            <button
              className="fn-keys key-plus-minus"
              onClick={() => this.onPlusMnClick()}>
              &plusmn;
            </button>
            <button
              className="fn-keys key-percent"
              onClick={() => this.onPercent()}>
              %
            </button>
            <button
              className="op-keys key-divide"
              onClick={() => this.onOperatorClick("/")}>
              &divide;
            </button>
            <button
              className="digit-keys key-7"
              onClick={() => this.onDigitKeyClick("7")}>
              7
            </button>
            <button
              className="digit-keys key-8"
              onClick={() => this.onDigitKeyClick("8")}>
              8
            </button>
            <button
              className="digit-keys key-9"
              onClick={() => this.onDigitKeyClick("9")}>
              9
            </button>
            <button
              className="op-keys key-multiply"
              onClick={() => this.onOperatorClick("*")}>
              &times;
            </button>
            <button
              className="digit-keys key-4"
              onClick={() => this.onDigitKeyClick("4")}>
              4
            </button>
            <button
              className="digit-keys key-5"
              onClick={() => this.onDigitKeyClick("5")}>
              5
            </button>
            <button
              className="digit-keys key-6"
              onClick={() => this.onDigitKeyClick("6")}>
              6
            </button>
            <button
              className="op-keys key-minus"
              onClick={() => this.onOperatorClick("-")}>
              &minus;
            </button>
            <button
              className="digit-keys key-1"
              onClick={() => this.onDigitKeyClick("1")}>
              1
            </button>
            <button
              className="digit-keys key-2"
              onClick={() => this.onDigitKeyClick("2")}>
              2
            </button>
            <button
              className="digit-keys key-3"
              onClick={() => this.onDigitKeyClick("3")}>
              3
            </button>
            <button
              className="op-keys key-plus"
              onClick={() => this.onOperatorClick("+")}>
              +
            </button>
            <button
              className="digit-keys key-0"
              onClick={() => this.onDigitKeyClick("0")}>
              0
            </button>
            <button
              className="digit-keys key-comma"
              onClick={() => this.onDotClick()}>
              .
            </button>
            <button
              className="op-keys key-equal"
              onClick={() => this.onEqual()}>
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
