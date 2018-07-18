import React from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Transition from "react-transition-group/Transition";

function FadeAndSlideTransition({ children, duration, in: inProp }) {
  const defaultStyle = {
    transition: `${duration}ms ease`,
    transitionProperty: 'opacity, transform'
  };

  const transitionStyles = {
    entering: {
      opacity: 0,
      transform: 'translateY(-10%)'
    },
    entered: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    exiting: {
      opacity: 0,
      transform: 'translateY(-10%)'
    }
  };

  return (
    <Transition in={inProp} timeout={{
      enter: 0,
      exit: duration
    }}>
      {
        (status) => {
          if(status === 'exited') {
            return null;
          }

          const currentStyles = transitionStyles[status];
          return React.cloneElement(children, {
            style: Object.assign({}, defaultStyle, currentStyles)
          });
        }
      }
    </Transition>
  );
}

function Card ({children, onRemove}) {
  return (
    <div className="card">
      {children}
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

function Board ({children}) {
  return (
    <ul className="board">
      {children}
    </ul>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }
  
  render() {
    const { cards } = this.state;

    return (
      <main className="container">
        <h1>React Transition</h1>
        <button onClick={() => this.addCard()}>Add a card</button>
        <button onClick={() => this.removeLastCard()}>Remove a card</button>
        <TransitionGroup component={Board}>
          {
            cards.map(card => {
              return (
                <FadeAndSlideTransition duration={250} key={card.id}>
                  <li className="board_item">
                    <Card onRemove={() => this.removeCard(card.id)}>
                      {card.content}
                    </Card>
                  </li>
                </FadeAndSlideTransition>
              );
            })
          }
        </TransitionGroup>
      </main>
    );
  }

  addCard() {
    const { cards } = this.state;
    const id = cards.length + 1;
    const newCard = {
      id,
      content: `Card ${id}`
    };

    this.setState({
      cards: cards.concat([newCard])
    });
  }

  removeCard(id) {
    const { cards } = this.state;

    this.setState({
      cards: cards.filter(card => card.id !== id)
    });
  }

  removeLastCard() {
    const { cards } = this.state;

    this.setState({
      cards: cards.slice(0, -1)
    });
  }
}

export default App;