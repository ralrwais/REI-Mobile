import React from 'react';
import '../index.css';
import LoadingIndicator from 'react-loading-indicator';

class App extends React.Component{
	render(){
		return (
		<div className="container">
			<img src="https://i.pinimg.com/736x/90/e3/3c/90e33c93d1b761ccb69a0741e659d2a8--winter-landscape-mountain-landscape.jpg" />
			<div className="header">
				<h1>REI</h1>
				<h3>Adventure Postcard</h3>
			</div>
			<div className="camera-input-wrapper">
	  			<button className="btn btn-mdb" id="btn-camera-input">Start Creating</button>
				<input id="photoInput" type="file" accept="image/*;capture=camera" />
			</div>
			<LoadingIndicator />
		</div>
		)
	}
};

export default App;
