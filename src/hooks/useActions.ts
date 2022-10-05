import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionsCreators } from '../redux/index'


export const useActions = () => {
    const dispatch = useDispatch()

    // Return All Actions 
    return bindActionCreators(actionsCreators, dispatch)
}