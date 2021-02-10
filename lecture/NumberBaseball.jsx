const React = require('react');
const { Component } = React;
import Try from './try';
function getNumber() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    Array.push(chosen);
  }
  return Array;
}
class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumber(),
    tries: [],
  };
  onsubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState({
        result: '홈런',
        tries: [...this.state.tries, { try: this.state.value, result: '홈런!' }],
      });
      alert('게임을 다시 시작합니다.');
      rhis.setState({
        answer: getNumbers(),
        tries: [],
      });
    } else {
      const answerArray = this.state.value.split('').map((value) => parseInt(value));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패 ! 답은: ${this.state.answer.join(',')}였습니다`,
        });
        alert('게임을 다시 시작합니다.');
        rhis.setState({
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크${ball} 볼입니다.` }],
          value: '',
        });
      }
    }
  };
  onChangeInput = () => {
    console.log(this.state.answer);
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onsubmit={this.onsubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>
          시도:{this.state.tries.length}
          <ul>
            {this.state.try.map((value, index) => {
              return <Try key={`${index - 1}차 시도:`} tryInfo={value} />;
            })}
          </ul>
        </div>
      </>
    );
  }
}
export default NumberBaseball;
