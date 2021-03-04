import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNUMBERS');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  };

  runTimeoutes = () => {
    console.log('runTimeout');
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return { winBalls: [...prevState.winBalls, winNumbers[i]] };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  timeouts = [];
  componentDidMount() {
    this.runTimeoutes();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('didUpdate');
    const { winBalls } = this.state;
    //state(setState)가 바뀔때마다 실행되므로 조건문이 중요.
    if (winBalls.length === 0) {
      this.runTimeoutes();
    }
  }

  componentWillUnmount() {
    console.log('willUnmount');
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    console.log('onClickRedo');
    //초기화
    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false,
    });
    this.timeouts = [];
  };
  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>
          당첨 숫자
          <div id="결과창">
            {winBalls.map((v) => (
              <Ball key={v} number={v} number={v} />
            ))}
          </div>
          <div>보너스!</div>
          {bonus && <Ball number={bonus} />}
          {redo && <button onClick={this.onClickRedo}>한번 더 !</button>}
        </div>
      </>
    );
  }
}
export default Lotto;
