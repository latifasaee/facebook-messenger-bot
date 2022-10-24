// API handler to access external APIs

// axios library to make requests
const axios = require('axios');

class API {
    // Constructor
    constructor(_options) {
        // Get options
        let { external, apiCred } = _options;
        // External request
        this.external = external || null;
        // apiCred
        this.apiCred = apiCred || null;
        // Response
        this.response = null;
    }

    // Set external
    setExternal(_external) {
        this.external = _external;
    }

    // Set apiCred
    setApiCred(_apiCred) {
        this.apiCred = _apiCred;
    }

    // Get request
    async get(resource, data, $headers = false) {
        let promise = new Promise((relove, reject) => {
            // Generate requestUrl
            let requestUrl = this.external ? resource : this.apiCred.base_url + resource;

            // Make sure we have data object sent from the service
            if (typeof data === 'object' && Object.keys(data).length > 0) {
                // Prepare the requestUrl data if there any
                Object.keys(data).forEach((k, i) => {
                    let delimiter = '&';
                    if (i === 0) {
                        delimiter = '?';
                    }
                    requestUrl += delimiter + k + '=' + data[k];
                });
            }

            // Define request options
            var options = {};

            // Check if headers sent
            $headers ? (options.headers = $headers) : null;

            // Call the actual API resource with the data
            axios
                .get(requestUrl, options)
                .then((response) => {
                    // Set response
                    this.response = response;
                    // When the request is done, send the data back to the service
                    relove(this.prepareResponse());
                })
                .catch((err) => {
                    // Set response
                    this.response = err;
                    // If any error occured, don't send anything back
                    reject(this.prepareResponse());
                });
        });
        return promise;
    }

    // Post request
    async post(resource, data, $headers = false) {
        let promise = new Promise((resolve, reject) => {
            // Generate requestUrl
            let requestUrl = this.external ? resource : this.apiCred.base_url + resource;

            // Make sure we have a data object
            // Otherwise, assign it to an empty object
            data = typeof data === 'object' && Object.keys(data).length > 0 ? data : {};

            // Define request options
            let options = {};

            // Check if headers sent
            $headers ? (options.headers = $headers) : null;

            // Call the API resource with the data
            axios
                .post(requestUrl, data, options)
                .then((response) => {
                    // Set response
                    this.response = response;
                    // When the request is done, send the data back
                    resolve(this.prepareResponse());
                })
                .catch((err) => {
                    // Set response
                    this.response = err;
                    // If any error occured, don't send anything back
                    reject(this.prepareResponse());
                });
        });

        return promise;
    }

    // Prepare response
    prepareResponse() {
        let _return = {};

        if (this.response.data === undefined) {
            // error thrown from the api call
            _return.success = false;
            _return.data = this.response;
        } else {
            _return.success = true;
            _return.data = this.response.data;
        }

        return _return;
    }
}

// Export API class
module.exports = API;
