import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './ModalGallery.scss';

const IMAGES = [
  { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
  { id: 1, title: "Lime Green", color: "LimeGreen" },
  { id: 2, title: "Tomato", color: "Tomato" },
  { id: 3, title: "Seven Ate Nine", color: "#789" },
  { id: 4, title: "Crimson", color: "Crimson" }
];

class ModalSwitch extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const currentLocation = this.props.location;
    // We update the previousLocation if props.location is not a modal
    // 1. We check if the net history action is not a POP (or a backward)
    // 2. Then we check if the current location has a state has or a state - modal
    // 3. We update the previousLocation with the current location
    if(nextProps.history.action !== 'POP' &&
      (!currentLocation.state || !currentLocation.state.modal)) {
        this.previousLocation = currentLocation;
    }
  }

  render() {
    

    const { location } = this.props;
    // !!() returns the condition result true or false
    // isModal is true checking the conditions from left to right. 1. Does the state exist, 2. does the modal exist and is true, 3. is the location different
    const isModal = !!(location.state && 
      location.state.modal &&
      this.previousLocation !== location
    );

    return (
      <div style={{ padding: "1rem" }}>
        {
          // The Switch location prop is overwritten using the previous location if location.state.modal is true.
          // The previous route is rendered when if the modal is opened from the gallery, showing both the gallery and modal at the image URL /img/:id
        }
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/img/:id" component={ImageView} />
        </Switch>
        {isModal ? <Route path="/img/:id" component={Modal} /> : null}
      </div>
    )
  }
}

const Home = () => (
  <div>
    <Link to="/gallery">Visit the gallery!</Link>
    <h3>Featured Images</h3>
    <ul className="nav-list">
      <li><Link to="/img/2">Tomato</Link></li>
      <li><Link to="/img/4">Crimson</Link></li>
    </ul>
  </div>
);

const Modal = ({ match: { params }, history }) => {
  const imageId = parseInt(params.id);
  const image = IMAGES[imageId];

  const back = e => {
    // prevent the click event from bubbling down and firing other onClick events inside DOM children
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div onClick={back} className="modal-container">
      <div className="modal">
        <h3>{image.title}</h3>
        <Image color={image.color} />
        <button onClick={back}>Back</button>
      </div>
    </div>
  )
};

const Gallery = () => (
  <div>
    {IMAGES.map(image => (
      <Link key={image.id} to={
        {
          pathname: `/img/${image.id}`,
          state: { modal: true }
        }
      }>
        <Thumbnail color={image.color} />
        <p>{image.title}</p>
      </Link>
    ))}
  </div>
);

const Thumbnail = ({ color }) => (
  <div style={{ width: "100px", height: "100px", background: color }} />
);

const ImageView = ({ match: { params } }) => {
  const imageId = parseInt(params.id);
  const image = IMAGES[imageId];

  return (
    <div>
      <h3>{image.title}</h3>
      <Image color={image.color} />
    </div>
  )
};

const Image = ({ color }) => (
  <div style={{ width: "100%", height: "400px", background: color }} />
);

const ModalGallery = () => (
  <Router>
    { 
      // A Route without path will alsways match
    }
    <Route component={ModalSwitch} />
  </Router>
);

export default ModalGallery;