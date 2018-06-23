import * as actions from "../actions";
import * as constants from '../constants'

let _singleton = Symbol();

class EventServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EventServiceClient(_singleton);
        return this[_singleton]
    }

    createEvent(eventName, venueName, eventDate){
        var event = {
            eventName: eventName,
            venueName: venueName,
            eventDate: eventDate
        };
        return fetch(constants.BASE_URL + 'createEvent', {
            method: 'post',
            body: JSON.stringify(event),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    findAllEventOFUser(){
        return fetch(constants.BASE_URL + 'events',{
            credentials: "include"
        })
    }

    deleteEvent(eventId){
        return fetch(constants.BASE_URL + 'event/' + eventId,{
            method: 'delete',
            credentials: "include"
        })
    }
}

export default EventServiceClient;