import React, { Component } from "react";
import * as style from "../index.css";
import LoadingIndicator from "react-loading-indicator";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      postCardUrl: undefined
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.buttonOrLoader = this.buttonOrLoader.bind(this);
  }

  changeHandler(e) {
    var photoInput = e.target.files[0];

    this.setState({ loading: true });

    var data = new FormData();

    data.append("file", photoInput);
    data.append("api_key", "893158381572411");
    data.append("timestamp", Date.now() / 1000);
    data.append("upload_preset", "an1hrkvd");

    axios
      .post("https://api.cloudinary.com/v1_1/hi1kbxbyk/image/upload", data)
      .then(response => {
        const url = response.data.url;
        axios
          .post("/pics", { url })
          .then(response => {
            const aiData = response.data;
            console.log("AiData response", response);

            if (aiData.success) {
              // turn the loader off now that loaded.
              this.setState({ loading: false });
              // Ai reponse data below
              this.setState({ postCardUrl: aiData.url });
            } else {
              // If the Ai did not match anything
              this.setState({ loading: false });
            }
          })
          .catch(err => {
            // Catch errors and stop leading event
            console.log("Error is ", err);
            this.setState({ loading: false });
          });
      })
      .catch(err => {
        // Catch errors and stop leading event
        this.setState({ loading: false });
      });
  }

  buttonOrLoader() {
    return this.state.loading ? (
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
    );
  }

  render() {
    if (this.state.postCardUrl !== undefined) {
      return (
        <div className="container">
          <img src={this.state.postCardUrl} />
        </div>
      );
      // return <Postcard url={this.state.postCardUrl} />
    } else {
      return (
        <div className="container">
          <img src="http://www.lovethispic.com/uploaded_images/127330-Greenland-Mountains.jpg" />
          <div className="header">
            <h1>REI</h1>
            <h3>Adventure Postcard</h3>
          </div>
          {this.buttonOrLoader()}
        </div>
      );
    }
  }
}

export default App;
