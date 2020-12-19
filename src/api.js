import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

var api = {};
var apiUrl = config.services.api.endpoint

api.post = (url, data) => {
    return api.request('POST', url, data);
};

api.get = (url, data) => {
    return api.request('GET', url, data);
};
api.url = apiUrl;

api.request = (method, url, data) => {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase();
        url = apiUrl + url;
        let headers = {};
        if (apiAuth && apiAuth.logged && apiAuth.token) {
            headers = api.oauth.authorizationHeader(apiAuth.token);
        }
        headers['Content-Type'] = 'application/json';

        api.sendRequest(method, url, headers, data)
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                if (response.status !== 400 && response.status !== 500)
                    reject(response)
            });
    });
};

api.sendRequest = (method, url, headers, data) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: method,
            url: url,
            headers: headers,
        };
        if (method == 'GET') options.params = data;
        else options.data = data;

        axios(options)
            .then(response => {
                resolve(response);
            })
            .catch(({ response }) => {
                resolve(response);
            });
    });
};

export default api;
