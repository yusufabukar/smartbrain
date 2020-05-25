import React, { Component, Fragment } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App(
  {apiKey: '26a1b3ee27984ad79f0058c0462b6bb7'}
);

const particlesOptions = {
  particles: {
    number: {
      value: 82,
      density: {
        enable: true,
        value_area: 791
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      stage: 'signIn',
      isLoggedIn: false,
      input: '',
      imageURL: '',
      box: {}
    };
  };

  onStageChange = (stage) => {
    if (stage === 'logOut') {
      this.setState({isLoggedIn: false});
    } else if (stage === 'main') {
      this.setState({isLoggedIn: true});
    };

    this.setState({ stage });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      topRow: clarifaiFace.top_row * height,
      leftColumn: clarifaiFace.left_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightColumn: width - (clarifaiFace.right_col * width)
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box });
  };

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log(error));
  }

  render() {
    const { isLoggedIn, stage, imageURL, box } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation isLoggedIn={isLoggedIn} onStageChange={this.onStageChange} />
        {stage === 'main'
          ? <Fragment>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageURL={imageURL} box={box} />
            </Fragment>
          : (stage === 'signIn'
              ? <SignIn onStageChange={this.onStageChange} />
              : <Register onStageChange={this.onStageChange} />
            )
        };
      </div>
    );
  };
};

export default App;