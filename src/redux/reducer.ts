import { Action } from "./actionTypes"
import { ActionTypes } from "./constants"

interface Tickets {
    tickets: [],
    loading: boolean,
    ticket: {}
}

const initialState: Tickets = {
    tickets: [],
    loading: false,
    ticket: {}
}

export const ticketsReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_TICKETS_LOADING:
            return { ...state, loading: true }
        case ActionTypes.GET_TICkETS:
            return { error: null, loading: false, tickets: action.payload }
        case ActionTypes.GET_TICKETS_FAIL:
            return { loading: false, tickets: [], error: action.payload }
        case ActionTypes.DELETE_TICKET:
        case ActionTypes.ADD_TICKET_SUCCESS:
        case ActionTypes.UPDATE_TICKET_SERVER:
            return { ...state, loading: false }
        case ActionTypes.UPDATE_TICKET_SUCCESS:
            return { error: null, loading: false, ticket: action.payload }
        default:
            return state
    }
}

