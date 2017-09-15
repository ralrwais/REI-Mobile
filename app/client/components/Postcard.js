import React, { Component } from "react";
import "../index.css";

function Postcard ({ url }) {
		return (
			<div className="container2">
				<h1>Great Work!</h1>
				<h5>Check out your Adventure Postcard:</h5>

				<div className="postcard"> 
					<img className ="postcard" src={url} />
				</div>
				<div className="shareButton">
				<button className="share"> 
					<a href="http://www.facebook.com/sharer.php?u=https://rei-mobile.herokuapp.com/" target="_blank">
       					 <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
   					 </a>
				</button>
				<button>
					<a href="https://mail.google.com/share?url=https://rei-mobile.herokuapp.com/" target="_blank">
       					 <img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" />
   					 </a>
				</button>
				</div>
				
			</div>
		)
	
}

export default Postcard;
