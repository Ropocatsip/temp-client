import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;
  let firstNum = Number(2)
  let secondNum = Number(7)
  let total = firstNum + secondNum;
  // document.getElementById("answer").innerHTML = ` ${firstNum} + ${secondNum} equals to ${total}` ;

  return (
    <div>
      <div>
        <h1>This is a first level heading in HTML. With CSS, I will turn this into red color</h1>
        <h2>This is a second level heading in HTML. With CSS, I will turn this into blue color</h2>
        <h3>This is a third level heading in HTML. With CSS, I will turn this into green color</h3>
        <p>This is a <em>paragragh</em> As you can see, I placed an empahisis on the word "paragraph". 
          Now, I will change also the background color of the word "paragraph" to black, 
          and its text color to green, all with just CSS.
        </p>
        <p>The main essence of this tutorial is to:</p>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
        <p>Next, I am going to add the following two numbers and display the result, all withJavaScript</p>
        <p>First number:<span id= "firstNum">2</span><br></br></p>
        <p>Second number: <span id= "secondNum">7</span></p>
        <p>Therefore, the sum of the two of those numbers is: <span id= "answer">{firstNum} + {secondNum} equals to {total}</span></p>
        <input type="button" id="sumButton" value="Click to add!"></input>
      </div>
    </div>
  );
}
