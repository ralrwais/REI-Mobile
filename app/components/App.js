import React, { Component } from 'react';
import '../index.css';
import LoadingIndicator from 'react-loading-indicator';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      loading: false
    };
  }

  changeHandler(e) {
    var photoInput = e.target.files[0];

    this.setState({ loading: true });

    var xml = new XMLHttpRequest();
    var data = new FormData();

    data.append('file', photoInput);
    data.append('api_key', '893158381572411');
    data.append('timestamp', Date.now() / 1000);
    data.append('upload_preset', 'an1hrkvd');

    axios
      .post('https://api.cloudinary.com/v1_1/hi1kbxbyk/image/upload', data)
      .then(response => {
        const url = response.data.url;
        axios
          .post('/pics', { url })
          .then(response => {
            const aiData = response.data;
            // turn the loader off now that loaded.
            this.setState({ loading: false });
            // Ai reponse data below
            console.log('Ai reponse is', aiData);
          })
          .catch(err => {
            // Catch errors and stop leading event
            this.setState({ leading: false });
          });
      })
      .catch(err => {
        // Catch errors and stop leading event
        this.setState({ leading: false });
      });
  }

  render() {
    return (
      <div className="container">
        <img src="https://i.pinimg.com/736x/90/e3/3c/90e33c93d1b761ccb69a0741e659d2a8--winter-landscape-mountain-landscape.jpg" />
        <div className="header">
          <h1>REI</h1>
          <h3>Adventure Postcard</h3>
        </div>
        {/* Load either the html button of the leader based on state of call to api */}
        {this.state.loading ? (
        <div className="camera-input-wrapper">
        	 <LoadingIndicator />
        </div>
        ) : (
          <div className="camera-input-wrapper">
            <button className="btn btn-mdb" id="btn-camera-input">
              Start Creating
            </button>
            <input
              id="photoInput"
              onChange={this.changeHandler}
              type="file"
              accept="image/*;capture=camera"
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;