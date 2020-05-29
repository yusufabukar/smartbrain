// SMARTBRAIN

import React, { Component, Fragment } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

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

const initialState = {
	stage: 'logIn',
	isLoggedIn: false,
	user: {
		id: '', // SEE IF CHANGING TO 0 AFFECTS APP
		name: '',
		email: '',
		entries: 0
	},
	input: '',
	imageURL: '',
	box: {}
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	};

	loadUser = (userData) => {
		this.setState({user: {
				id: userData.id,
				name: userData.name,
				email: userData.email,
				entries: userData.entries
			}
		});
	};

	onStageChange = (stage) => {
		if (stage === 'logOut') {
			this.setState(initialState);
		} else if (stage === 'main') {
			this.setState({isLoggedIn: true});
		};
		this.setState({ stage });
	};

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	};

	detectFaceLocation = (data) => {
		const faceLocationData = data.outputs[0].data.regions[0].region_info.boundingbox;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			topRow: faceLocationData.top_row * height,
			rightColumn: width - (faceLocationData.right_col * width),
			bottomRow: height - (faceLocationData.bottom_row * height),
			leftColumn: faceLocationData.left_col * width
		};
	};

	displayDetectionBox = (box) => {
		this.setState({ box });
	};

	onImageSubmit = () => {
		this.setState({imageURL: this.state.input});

		fetch('http://localhost:3001/imageurl', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					input: this.state.input // SHOULD WE BE SENDING OVER IMAGEURL
				})
		})
			.then(response => response.json())
			.then(response => {
				if (response) {
					fetch('http://localhost:3001/image', {
							method: 'PUT',
							headers: {'Content-Type': 'application/json'},
							body: JSON.stringify({
								id: this.state.user.id
							})
					})
						.then(response => response.json())
						.then(count => this.setState(Object.assign(this.state.user, {entries: count})))
						.catch(error => console.log(error));
				};
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch(error => console.log(error));
	};

	render() {
		const { stage, isLoggedIn, user, imageURL, box } = this.state;
		return (
			<div className='App'>
				<Particles className='particles' params={particlesOptions} />
				<Navigation isLoggedIn={isLoggedIn} onStageChange={this.onStageChange} />
				
				{stage === 'main'
					?	<Fragment>
							<Logo />
							<Rank name={user.name} entries={user.entries} />
							<ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit} />
							<FaceRecognition imageURL={imageURL} box={box} />
						</Fragment>
					: 	(stage === 'logIn'
							? <LogIn loadUser={this.loadUser} onStageChange={this.onStageChange} />
							: <Register loadUser={this.loadUser} onStageChange={this.onStageChange} />
					  	)
				}
			</div>
		);
	};
};

export default App;