import { ActionTypes } from './constants'

interface GetTicketsLoading {
    type: ActionTypes.GET_TICKETS_LOADING,
}

interface GetTicketsSuccess {
    type: ActionTypes.GET_TICkETS,
    payload: Object[]
}

interface GetTicketsFail {
    type: ActionTypes.GET_TICKETS_FAIL,
    payload: string
}

interface DeleteTicket {
    type: ActionTypes.DELETE_TICKET
}

interface AddTicket {
    type: ActionTypes.ADD_TICKET_SUCCESS
}

interface AddTicketFail {
    type: ActionTypes.ADD_TICKET_FAIL
}

interface UpdateTicket {
    type: ActionTypes.UPDATE_TICKET_SUCCESS,
    payload: object
}

interface UpdateTicketFAIL {
    type: ActionTypes.UPDATE_TICKET_FAIL
}

interface UpdateTicketServer {
    type: ActionTypes.UPDATE_TICKET_SERVER
}


// For Collection All Action in one Type
export type Action = | GetTicketsLoading | GetTicketsSuccess | GetTicketsFail | DeleteTicket | AddTicket | AddTicketFail | UpdateTicket | UpdateTicketFAIL | UpdateTicketServer