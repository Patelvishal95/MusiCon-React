import * as constants from '../constants';

let _singleton = Symbol();

class UserServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new UserServiceClient(_singleton);
        return this[_singleton]
    }

    updateUser(user){
        return fetch(constants.BASE_URL+'profile',{
            method: 'put',
            credentials: 'include', // include, same-origin, *omit
            body:JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    profile() {
        return fetch(constants.BASE_URL+'profile',{
                credentials: 'include', // include, same-origin, *omit
            })
            .then(response => response.json());
    }

    login(username, password) {
        var user = {
            username: username,
            password: password
        };
        return fetch(constants.BASE_URL+'login',{
            method: 'post',
            credentials: "include",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    registerManager(username, password, type, location){
        var user = {
            username: username,
            password: password,
            type: type,
            eventLocation: location
        };
        return fetch(constants.BASE_URL+'register',{
            method: 'post',
            credentials: "include",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    registerUser(username, password, type){
        var user = {
            username: username,
            password: password,
            type: type
        };
        return fetch(constants.BASE_URL+'register',{
            method: 'post',
            credentials: "include",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    logout(){
        return fetch(constants.BASE_URL+'logout',{
            method: 'post',
            credentials: "include",})
    }

}
export default UserServiceClient;