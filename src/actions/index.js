import SearchServiceClient from '../services/search.service.client'
import UserServiceClient from '../services/user.service.client'
import * as constants from "../constants";
import GetDetailsServiceClient from "../services/get-details.service.client";
import EventServiceClient from "../services/event.service.client";
import AlbumServiceClient from '../services/album.service.client';
import TrackServiceClient from '../services/track.service.client';

export const queryChanged = (dispatch, newQuery) => (
    dispatch({
        type: constants.QUERY_CHANGED,
        query: newQuery
    })
);

export const searchTypeChanged = (dispatch, newType) => (
    dispatch({
        type: constants.TYPE_CHANGED,
        searchType: newType
    })
);

export const searchQuery = (dispatch, query, queryType) => {

    if (queryType.value === 'events') {
        let searchServiceClient = SearchServiceClient.instance;
        searchServiceClient.searchEvents(query.value)
            .then(response => {
                response.json()
                    .then(results =>
                        dispatch({
                            type: constants.SEARCH,
                            flag: 'events',
                            results: results
                        })
                    )
            });
    }
    else {
        let searchServiceClient = SearchServiceClient.instance;
        searchServiceClient
            .searchQuery(query.value, queryType.value)
            .then((results) => {
                var rootKey;
                for (var ele in results) {
                    rootKey = ele;
                }
                if (rootKey === 'albums') {
                    dispatch({
                        type: constants.SEARCH,
                        flag: 'album',
                        results: results.albums.items
                    })
                } else if (rootKey === 'tracks') {
                    dispatch({
                        type: constants.SEARCH,
                        flag: 'track',
                        results: results.tracks.items
                    })
                } else if (rootKey === 'artists') {
                    dispatch({
                        type: constants.SEARCH,
                        flag: 'artist',
                        results: results.artists.items
                    })
                }
            });
    }
};
export const textChanged = (dispatch, type, newText) => (
    dispatch({
        type: constants.TEXT_CHANGED,
        fieldType: type,
        text: newText
    })
);

export const selectUserType = (dispatch, type) => (
    dispatch({
        type: constants.SAVE_USERTYPE,
        userType: type
    })
);

export const registerManager = (dispatch, username, password, verifyPassword, userType, eventLocation) => {
    if (password !== verifyPassword)
        alert("Password doesn't match");
    else {
        UserServiceClient.instance
            .registerManager(username, password, userType, eventLocation)
            .then(response => {
                if (response.status === 500) {
                    alert('username already exist')
                }
                else {
                    dispatch({
                        type: constants.SAVE_USERNAME_AND_USERTYPE,
                        username: username,
                        userType: userType
                    })
                }
            })
    }
};

export const registerUser = (dispatch, username, password, verifyPassword, userType) => {
    if (password !== verifyPassword)
        alert("Password doesn't match");
    else {
        UserServiceClient.instance
            .registerUser(username, password, userType)
            .then(response => {
                if (response.status === 500) {
                    alert('username already exist')
                }
                else {
                    dispatch({
                        type: constants.SAVE_USERNAME_AND_USERTYPE,
                        username: username,
                        userType: userType
                    })
                }
            })
    }
};

export const updateUser = (user) => (
    UserServiceClient.instance
        .updateUser(user)
);
export const updateStateWithUserNameAndType = (dispatch, username, type) => (
    dispatch({
        type: constants.SAVE_USERNAME_AND_USERTYPE,
        username: username,
        userType: type
    })
);
export const getProfile = (dispatch) => (
    UserServiceClient.instance
        .profile()
        .then(response => dispatch({
            type: constants.FETCH_PROFILE,
            data: response
        }))
);

export const login = (dispatch, username, password) => (
    UserServiceClient.instance
        .login(username, password)

);

export const searchEventsForUser = (dispatch, city) => {
    if (city !== undefined) {
        SearchServiceClient.instance
            .searchEventsForUser(city)
            .then(response => response.json()
                .then(results => dispatch({
                        type: constants.SEARCH,
                        flag: 'eventsforuser',
                        results: results
                    })
                ))
    }
};

export const logout = (dispatch) => (
    UserServiceClient.instance
        .logout()
        .then(() =>
            dispatch({
                type: constants.LOGOUT
            })
        )
);
export const selectedItem = (dispatch, artist, item, type) => {
    let getDetailsServiceClient = GetDetailsServiceClient.instance;
    if (type === 'track') {
        getDetailsServiceClient
            .getTrackInfo(artist, item)
            .then(response => {
                response.json().then((res) => {
                    console.log(res);
                    dispatch({
                        type: constants.SET_DETAILS,
                        flag: 'track',
                        result: res
                    })
                })
            })
    } else if (type === 'album') {
        getDetailsServiceClient
            .getAlbumInfo(artist, item)
            .then(response => {
                response.json().then((res) => {
                    console.log(res);
                    dispatch({
                        type: constants.SET_DETAILS,
                        flag: 'album',
                        result: res
                    })
                })
            })
    } else if (type === 'artist') {
        getDetailsServiceClient
            .getArtistInfo(artist)
            .then(response => {
                response.json().then((res) => {
                    console.log(res);
                    dispatch({
                        type: constants.SET_DETAILS,
                        flag: 'artist',
                        result: res
                    })
                })
            })
    }
};

export const toggleDetails = (dispatch) => (
    dispatch({
        type: constants.TOGGLE_DETAILS
    })
);

export const itemLiked = (dispatch,item ,type) => {
    if(type==='album'){
        AlbumServiceClient.instance
            .saveLike(item)
            .then(response =>{
                if(response.status===501){
                    alert("Already liked");
                }
                else if(response.status===500){
                    alert("Try Logging in");
                }
                else {
                    alert("Liked Album "+item.name);
                }
            })
    }
    else if(type==='track'){
        TrackServiceClient.instance
            .saveLike(item)
            .then(response =>{
                if(response.status===501){
                    alert("Already liked");
                }
                else if(response.status===500){
                    alert("Try Logging in");
                }
                else {
                    alert('Liked Track '+item.name);
                }
            })
    }
}

export const createEvent = (dispatch, eventName, venueName, eventDate) => {
    let eventServiceClient = EventServiceClient.instance;
    eventServiceClient
        .createEvent(eventName, venueName, eventDate)
        .then(response => {
            eventServiceClient
                .findAllEventOFUser()
                .then(response1 => {
                    response1.json()
                        .then(res => {
                            dispatch({
                                type: constants.ALL_EVENTS_FOR_USER,
                                events: res.events
                            })
                        })
                })
        })
};

export const findAllEventOfUser = (dispatch) => {
    let eventServiceClient = EventServiceClient.instance;
    eventServiceClient
        .findAllEventOFUser()
        .then(response => {
            response.json()
                .then(res => {
                    dispatch({
                        type: constants.ALL_EVENTS_FOR_USER,
                        events: res.events
                    })
                })
        })
};

export const deleteEventForConcertManager = (dispatch, event) => {
    let eventServiceClient = EventServiceClient.instance;
    eventServiceClient
        .deleteEvent(event._id)
        .then(response => {
            eventServiceClient
                .findAllEventOFUser()
                .then(response1 => {
                    response1.json()
                        .then(res => {
                            dispatch({
                                type: constants.ALL_EVENTS_FOR_USER,
                                events: res.events
                            })
                        })
                })
        })
};

