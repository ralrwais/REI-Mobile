import React from 'react';
import '../index.css';

class App extends React.Component{
	render(){
		return (
		<div className="container">
		<img src="https://i.pinimg.com/736x/90/e3/3c/90e33c93d1b761ccb69a0741e659d2a8--winter-landscape-mountain-landscape.jpg" />
		<div className="header">
			<h1>REI</h1>
			<h3>Adventure Postcard</h3>
		</div>
		<input className="camera" type="file" accept="image/*;capture=camera" />
		</div>
		)
	}
};

export default App;
