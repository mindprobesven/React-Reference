/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import Home from './Home';
import Gallery from './Gallery';
import GalleryModal from './GalleryModal';
import ImageView from './ImageView';
import ModalView from './ModalView';

// This example shows how to render two different screens
// (or the same screen in a different context) at the same URL,
// depending on how you got there.
//
// In the example bellow /img/:id renders either as full-screen <ImageView> from /gallery-no-modal
// or in a modal <ModalView> with <GalleryModal> from /gallery-with-modal in the background.

const SwitchController = ({ images }) => {
  // The <SwitchController> component can access 'location' via useLocation()
  // because it is a child of <Router>
  const location = useLocation();
  // Contains the pathname and state object of the current URL
  console.log(location);

  // When an image link is clicked in <GalleryModal> the location state
  // will contain the location of /gallery-with-modal in location.state.background
  const background = location.state && location.state.background;
  console.log(background);

  return (
    <div>
      {/* If location.state.background is set, <Switch> will use it instead of 'location'
      This will render the <GalleryModal> route in the background of the modal */}
      <Switch location={background || location}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/gallery-no-modal">
          <Gallery images={images} />
        </Route>
        <Route path="/gallery-with-modal">
          <GalleryModal images={images} />
        </Route>
        <Route path="/img/:id">
          <ImageView images={images} />
        </Route>
      </Switch>

      {/* This route will render the modal if location.state.background contains the location
      of /gallery-with-modal, which is only set when an image link is clicked in <GalleryModal> */}
      { background && <Route path="/img/:id"><ModalView images={images} /></Route> }
    </div>
  );
};

export default SwitchController;
