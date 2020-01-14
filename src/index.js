import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  createStore
} from 'redux';


const buttonsInfo = [{
    id: 'AC',
    size: 'horRectangle',
    color: 'red',
    type: 'ACT'
  },
  {
    id: '/',
    size: 'square',
    color: 'light-gray',
    type: 'ACT'
  },
  {
    id: 'x',
    size: 'square',
    color: 'light-gray',
    type: 'ACT'
  },
  {
    id: '7',
    size: 'square',
    type: 'NUM'
  },
  {
    id: '8',
    size: 'square',
    type: 'NUM'
  },
  {
    id: '9',
    size: 'square',
    type: 'NUM'
  },
  {
    id: '-',
    size: 'square',
    color: 'light-gray',
    type: 'ACT'
  },
  {
    id: '4',
    size: 'square',
    type: 'NUM'
  },
  {
    id: '5',
    size: 'square',
    type: 'NUM'
  },
  {
    id: '6',
    size: 'square',
    type: 'NUM'
  },
  {
    id: '+',
    size: 'square',
    color: 'light-gray',
    type: 'ACT'
  },
  {
    id: '1',
    size: 'square',
    type: 'NUM'
  },
  {
    id: '2',
    size: 'square',
    type: 'NUM'
  },
  {
    id: '3',
    size: 'square',
    type: 'NUM'
  },
  {
    id: '=',
    size: 'vertRectangle',
    color: 'blue',
    type: 'COUNT'
  },
  {
    id: '0',
    size: 'horRectangle',
    type: 'NUM'
  },
  {
    id: '.',
    size: 'square',
    type: 'NUM'
  }
];

const exprReducer = (state = {
  curDisplay: '0',
  allDisplay: '0',
  last: 'NONE'
}, action) => {
  switch (action.type) {
    case "ACT":
      switch (action.id) {
        case 'AC':
          return Object.assign({}, state, {
            curDisplay: '0',
            allDisplay: '0',
            last: 'NONE'
          });
        case '+':
        case '-':
        case '/':
        case 'x':
          if (state.last === 'NUM') return Object.assign({}, state, {
            curDisplay: action.id,
            allDisplay: state.allDisplay + action.id,
            last: 'ACT'
          });
          if (state.last === 'NONE' && action.id === '-')
            return Object.assign({}, state, {
              curDisplay: action.id,
              allDisplay: action.id,
              last: 'ACT'
            });
        default:
          return state;
      }
      case "NUM":
        switch (state.last) {
          case 'NONE':
            return {
              curDisplay: action.id, allDisplay: action.id, last: 'NUM'
            };
          case 'NUM':
            return {
              curDisplay: state.curDisplay + action.id, allDisplay: state.allDisplay + action.id, last: 'NUM'
            };
          case 'ACT':
            return {
              curDisplay: action.id, allDisplay: state.allDisplay + action.id, last: 'NUM'
            };
          default:
            return state;
        }
        default:
          return state;
  }
}






class CalcButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    store.dispatch({
      id: this.props.props.id,
      type: this.props.props.type
    });
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
    render() {
      let buttons = buttonsInfo.map((button,idx) => < CalcButton key={idx} props = {
          button
        }
        />);
        return ( <
          div id = "calc" >
          <
          div id = "displays" >
          <
          div id = "allDisp" > {
            this.props.props.allDisplay
          } < /div> <
          div id = "currentDisp" > {
            this.props.props.curDisplay
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
    const store = createStore(exprReducer);
    const render = () => {
        ReactDOM.render( < Calc props = {
            store.getState()
          }
          /> , document.getElementById('root'));
        }
        render();
        store.subscribe(render);
