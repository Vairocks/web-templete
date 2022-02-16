 
import axios from 'axios';  
const timeoutDuration = 40000;
 
/**	   
send header object 
* @param: bool: isW3APICall true if call is for w3 auth else node server call
* @param: String:jwtToken W3 auth JWT token for NGINX	 
*/
function getHeaders(isUrlEncoded, jwtToken) {
    let header = {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (!isUrlEncoded) {
        header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }
    return header;
};


/**	   
* @param: path: sting path of API to be called
* @param: params: object of all parameters
*/
export const initAPICall = (configObj) => {
    let timeout = null;
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    let apiConfigObject = {
        method: configObj.method,
        timeout: timeoutDuration,
        cancelToken: source.token
    };

    if (configObj.method === 'get') {
        apiConfigObject.params = configObj.params;
    } else {
        apiConfigObject.data = configObj.params;
    }
    apiConfigObject.url = process.env.REACT_APP_DOMAIN + configObj.path;
  
 //   apiConfigObject.url=process.env.REACT_APP_DOMAIN + configObj.path;
    return new Promise((resolve, reject) => {
	
        apiConfigObject.headers = getHeaders();	
        axios(apiConfigObject).then(response => {
            if (timeout) {
                clearTimeout(timeout);
            }
            resolve(response);
        }).catch((error) => {
            //timeout happened
            if (axios.isCancel(error)) {
                if (timeout) {
                    clearTimeout(timeout);
                }
            }
            reject(error);
        });

        timeout = setTimeout(() => {
            source.cancel('Timeout');
        }, timeoutDuration);

    });
};