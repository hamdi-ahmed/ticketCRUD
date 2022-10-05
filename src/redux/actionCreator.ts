import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionTypes } from './constants'
import { Action } from './actionTypes'

export const getTickets = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionTypes.GET_TICKETS_LOADING })
        try {
            const { data } = await axios.get(`http://localhost:5000/tickets`)
            dispatch({
                type: ActionTypes.GET_TICkETS,
                payload: data
            })
        } catch (err: any) {
            dispatch({
                type: ActionTypes.GET_TICKETS_FAIL,
                payload: err.message
            })
        }
    }
}

export const deleteTicket = (id: number) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            await axios.delete(`http://localhost:5000/tickets/${id}`).then(res => {
                dispatch({
                    type: ActionTypes.DELETE_TICKET,
                })
            })

            const { data } = await axios.get(`http://localhost:5000/tickets`)
            dispatch({
                type: ActionTypes.GET_TICkETS,
                payload: data
            })

        } catch (err: any) {
            dispatch({
                type: ActionTypes.GET_TICKETS_FAIL,
                payload: err.message
            })
        }
    }
}

export const addTicket = (ticket: object) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            await axios.post(`http://localhost:5000/tickets`, ticket).then(res => {
                dispatch({
                    type: ActionTypes.ADD_TICKET_SUCCESS,
                })
            })
            const { data } = await axios.get(`http://localhost:5000/tickets`)
            dispatch({
                type: ActionTypes.GET_TICkETS,
                payload: data
            })
        } catch (err: any) {
            dispatch({
                type: ActionTypes.ADD_TICKET_FAIL,
                payload: err.message
            })
        }
    }
}

export const getSingleTicket = (id: number | string) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/tickets/${id}`)
            dispatch({
                type: ActionTypes.UPDATE_TICKET_SUCCESS,
                payload: data
            })
        } catch (err: any) {
            dispatch({
                type: ActionTypes.UPDATE_TICKET_FAIL,
                payload: err.message
            })
        }
    }
}


export const updateTicketServer = (data: any, id: number | string) => {
    return async (dispatch: Dispatch<Action>) => {
        await axios.put(`http://localhost:5000/tickets/${id}`, data).then(res => {
            dispatch({
                type: ActionTypes.UPDATE_TICKET_SERVER
            })
        })
    }
}
