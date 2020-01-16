import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore
} from 'redux';
import {
  Provider,
  connect
} from 'react-redux';
import './index.css';
import {
  COUNT,
  NUM,
  ACT,
  NONE
} from './calcTypes'



const buttonsInfo = [{
    id: 'AC',
    size: 'horRectangle',
    color: 'red',
    type: ACT
  },
  {
    id: '/',
    size: 'square',
    color: 'light-gray',
    type: ACT
  },
  {
    id: 'x',
    size: 'square',
    color: 'light-gray',
    type: ACT
  },
  {
    id: '7',
    size: 'square',
    type: NUM
  },
  {
    id: '8',
    size: 'square',
    type: NUM
  },
  {
    id: '9',
    size: 'square',
    type: NUM
  },
  {
    id: '-',
    size: 'square',
    color: 'light-gray',
    type: ACT
  },
  {
    id: '4',
    size: 'square',
    type: NUM
  },
  {
    id: '5',
    size: 'square',
    type: NUM
  },
  {
    id: '6',
    size: 'square',
    type: NUM
  },
  {
    id: '+',
    size: 'square',
    color: 'light-gray',
    type: ACT
  },
  {
    id: '1',
    size: 'square',
    type: NUM
  },
  {
    id: '2',
    size: 'square',
    type: NUM
  },
  {
    id: '3',
    size: 'square',
    type: NUM
  },
  {
    id: '=',
    size: 'vertRectangle',
    color: 'blue',
    type: COUNT
  },
  {
    id: '0',
    size: 'horRectangle',
    type: NUM
  },
  {
    id: '.',
    size: 'square',
    type: NUM
  }
];
const count = (expression) => {
  let nums = [];
  let curNum = "";
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === '.') {
      curNum += expression[i];
      i++;
    }
    if (parseFloat(expression[i]) || parseFloat(expression[i]) === 0) curNum += expression[i].toString();
    else {
      if (curNum !== '') nums.push(curNum);
      if (expression[i] !== '=') nums.push(expression[i]);
      curNum = "";
    }
  }
  nums.push(curNum);
  for (let i = 0; i < nums.length; i++) {

    switch (nums[i]) {
      case '-':
        nums = [...nums.slice(0, i), 0 - nums[i + 1], ...nums.slice(i + 2, nums.length)];
        break;
      case '/':
        nums = [...nums.slice(0, i - 1), nums[i - 1] / nums[i + 1], ...nums.slice(i + 2, nums.length)];
        i--;
        break;
      case 'x':
        nums = [...nums.slice(0, i - 1), nums[i - 1] * nums[i + 1], ...nums.slice(i + 2, nums.length)];
        i--;
        break;
      case '+':
        nums = [...nums.slice(0, i), ...nums.slice(i + 1, nums.length)];
      default:
        break;
    }
  }
  nums = [...nums.map(num => parseFloat(num))];
  return nums.reduce((sum = 0, current) => {
    return sum + current
  }, 0);
}

const exprReducer = (state = {
  curDisplay: '0',
  allDisplay: '0',
  last: NONE
}, action) => {
  switch (action.type) {
    case ACT:
      switch (action.id) {
        case 'AC':
          return Object.assign({}, state, {
            curDisplay: '0',
            allDisplay: '0',
            last: NONE
          });
        case '+':
        case '-':
        case '/':
        case 'x':
          if (state.last === NUM) return Object.assign({}, state, {
            curDisplay: action.id,
            allDisplay: state.allDisplay + action.id,
            last: ACT
          });

          if (state.last === COUNT) {
            return Object.assign({}, state, {
              curDisplay: action.id,
              allDisplay: state.curDisplay + action.id,
              last: ACT
            });
          }
          if (state.last === NONE && action.id === '-')
            return Object.assign({}, state, {
              curDisplay: action.id,
              allDisplay: action.id,
              last: ACT
            });
        default:
          return state;
      }
      case NUM:
        switch (state.last) {
          case NONE:
            return {
              curDisplay: action.id, allDisplay: action.id, last: NUM
            };
          case NUM:
            return {
              curDisplay: state.curDisplay + action.id, allDisplay: state.allDisplay + action.id, last: NUM
            };
          case ACT:
            return {
              curDisplay: action.id, allDisplay: state.allDisplay + action.id, last: NUM
            };
          case COUNT:
            return Object.assign({}, state, {
              curDisplay: action.id,
              allDisplay: action.id,
              last: NUM
            });

          default:
            return state;
        }
        case COUNT:
          if (state.last === COUNT) return state;
          return {
            curDisplay: count(state.allDisplay), allDisplay: state.allDisplay + '=' + count(state.allDisplay).toString(), last: COUNT
          };
        default:
          return state;
  }
}

class CalcButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.click(this.props.props);

  }
  render() {
    return ( <
      button id = {
        this.props.props.id
      }
      className = {
        "button " + this.props.props.size + " " + this.props.props.color
      }
      onClick = {
        this.handleClick
      } > {
        this.props.props.id
      } < /button>
    )
  }
}
class Calc extends React.Component {
    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress.bind(this));
    }
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress.bind(this));
    }
    handleKeyPress(event) {

      if (buttonsInfo.map((button) => button.id).includes(event.key))
        document.getElementById(event.key).click();
      else if (event.key === 'Backspace')
        document.getElementById('AC').click();
      else if (event.key === 'Enter')
        document.getElementById('=').click();
    }
    render() {
      let buttons = buttonsInfo.map((button, idx) => < CalcButton key = {
          idx
        }
        props = {
          button
        }
        click = {
          this.props.updateScr
        }
        />);
        return ( <
          div id = "calc"
          onKeyDown = {
            this.handleKeyPress
          } >
          <
          div id = "displays" >
          <
          div id = "allDisp" > {
            this.props.allDisplay
          } < /div> <
          div id = "currentDisp" > {
            this.props.curDisplay
          } < /div> < /
          div > <
          div id = "numPad" > {
            buttons
          } <
          /div> < /
          div >
        )
      }
    }
    const store = createStore(exprReducer);// React-Redux:

    const updScr = (action) => {
      return {
        id: action.id,
        type: action.type
      }
    };
    const mapStateToProps = (state) => {
      return {
        curDisplay: state.curDisplay,
        allDisplay: state.allDisplay
      }
    };
    const mapDispatchToProps = (dispatch) => {
      return {
        updateScr: (action) => {
          dispatch(updScr(action));
        }
      }
    };

    const Container = connect(mapStateToProps, mapDispatchToProps)(Calc);

    ReactDOM.render( <
      Provider store = {
        store
      } >
      <
      Container / >
      <
      /Provider>,
      document.getElementById('root')
    );
