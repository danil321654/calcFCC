import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Redux, {createStore} from 'redux';

const buttonsInfo = [
                {id: 'AC',size:'horRectangle', color: 'red', type:'act'},
                {id: '/',size:'square', color: 'light-gray', type:'act'},
                {id: 'x',size:'square', color: 'light-gray', type:'act'},
                {id: '7',size:'square', type:'act'},
                {id: '8',size:'square', type:'num'},
                {id: '9',size:'square', type:'num'},
                {id: '-',size:'square', color: 'light-gray', type:'act'},
                {id: '4',size:'square', type:'num'},
                {id: '5',size:'square', type:'num'},
                {id: '6',size:'square', type:'num'},
                {id: '+',size:'square', color: 'light-gray', type:'act'},
                {id: '1',size:'square', type:'num'},
                {id: '2',size:'square', type:'num'},
                {id: '3',size:'square', type:'num'},
                {id: '=',size:'vertRectangle', color: 'blue', type:'act'},
                {id: '0',size:'horRectangle', type:'num'},
                {id: '.',size:'square', type:'num'}
              ];

class CalcButton extends React.Component{
  render(){
    return(
      <button id={this.props.props.id} className={"button " + this.props.props.size +" "+ this.props.props.color}> {this.props.props.id} </button>
    )
  }
}
class Calc extends React.Component{
  render(){
    let buttons = buttonsInfo.map((button)=> <CalcButton props={button}/>);
    return(
      <div id="calc" >

        <div id="displays">
              <div id="allDisp">0</div>

              <div id="currentDisp">0</div>
          </div>
      <div id="numPad">
        {buttons}
        </div>
      </div>
    )
  }
}





ReactDOM.render(<Calc />, document.getElementById('root'));
