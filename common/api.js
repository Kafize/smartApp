
const baseUrl = 'http://192.168.0.103:8083'  
const request = (options = {}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + options.url || '',
            method:options.type || 'GET' ,
            data: options.data || {},
            header: {Authorization:uni.getStorageSync('token')} || {},
        }).then((response) => {      
            resolve(response);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}
const get=(url,data,options={})=>{
    options.type='get';
    options.data = data;
    options.url = url;
    return request(options)
}
const post = (url, data, options = {}) => {
    options.type = 'post';
    options.data = data;
    options.url = url;
    return request(options)
}
const put = (url, data, options = {}) => {
    options.type = 'put';
    options.data = data;
    options.url = url;
    return request(options)
}
export default {
    request,
    get,
    post,
    put,
    baseUrl
}
