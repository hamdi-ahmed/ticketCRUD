import { combineReducers } from "redux";
import { ticketsReducer } from "./reducer";

const rootReducer = combineReducers({
    tickets: ticketsReducer
})

export default rootReducer