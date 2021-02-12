import React,{useState} from('react');
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
const NumberBaseball=()=>{
    const [result, setResult] = useState('');
    const [value,setValue] = useState('');
    const[answer,setAnswer] = useState('');
    const [tries,setTries] = useState('');

  const onsubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
        setResult('홈런');
        setTries((prevTries)=>{
           return  [...prevtries, { try:value, result: '홈런!' }]
        })
      alert('게임을 다시 시작합니다.');
      setValue('');
      setAnswer(getNumber());
      setTries([]);

    } else {
      const answerArray = value.split('').map((value) => parseInt(value));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
          setResult(`10번 넘게 틀려서 실패 ! 답은: ${answer.join(',')}였습니다`)
        alert('게임을 다시 시작합니다.');
        setAnswer(getNumbers());
        setTries([]);

      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] ===answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries)=>{
            [...prevtries, { try: value, result: `${strike} 스트라이크${ball} 볼입니다.`}];
            setValue('');
        })
       
      }
    }
  };
  const onChangeInput = (e) => {
      setValue(e.tries)

  };


    return (
      <>
        <h1>{result}</h1>
        <form onsubmit={onsubmitForm}>
          <input maxLength={4} value={value} onChange={onChangeInput} />
        </form>
        <div>
          시도:{tries.length}
          <ul>
            {this.state.try.map((value, index) => {
              return <Try key={`${index - 1}차 시도:`} tryInfo={value} />;
            })}
          </ul>
        </div>
      </>
    );
}
export default NumberBaseball;
