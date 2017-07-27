    export function xhrPromise(options){
    return new Promise((resolve, reject)=>{
        try {
            let xhr = new XMLHttpRequest();
            xhr.open(options.method, options.url, true);
            xhr.responseType = options.responseType || "json";
            xhr.onload = function(){
                if (this.status >= 200 && this.status < 300) {
                    resolve({
                        response: xhr.response,
                        status: this.status
                    });
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function(){
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            /**Headers and params are optional*/
            if (options.headers) {
                Object.keys(options.headers).forEach((key)=>{
                    xhr.setRequestHeader(key, options.headers[key]);
                });
            }
            let params = options.params;
            /** We'll need to stringify if we've been given an object
             If we have a string, this is skipped.*/
            if (params && typeof params === 'object') {
                params = Object.keys(params).map((key)=>{
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }
            xhr.send(params);
        } catch (e) {
            reject({
                status: 406,
                statusText: e
            })
        }
    })
}