var axios = require('axios');

module.exports = {
	getURL: function(url) {
		var captureURL = '';

		return axios.get(getURL)
		.then(function(response) {
			return response.data.url;
		})
	}
}
