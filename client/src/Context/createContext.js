import React, { useReducer, createContext } from 'react'
import App from '../App'
import { reducer } from '../reducer/reducer'

export const ProjectContext = createContext()

let initialState = {
    user: [],
    msg: null,
    toggle: false
}
const CreateContext = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getUserMail = (data) => {
        return dispatch({
            type: 'USER_MAIL',
            payload: {
                data: data
            }
        })
    }
    const clearUser = () => {
        return dispatch({
            type: 'CLEAR_USER',
        })
    }
    const setMsg = (message) => {
        return dispatch({
            type: 'GET_MESSAGE',
            data: message
        })
    }

    const clearMessage = () => {
        return dispatch({
            type: 'CLEAR_MESSAGE'

        })
    }

    const Login = () => {
        return dispatch({
            type: "USER",
            payload: true
        })
    }
    const Logout = () => {
        return dispatch({
            type: "USER",
            payload: false
        })
    }



    return (
        <ProjectContext.Provider value={{ ...state, getUserMail, clearUser, setMsg, clearMessage, Login, Logout }}>
            <App />
        </ProjectContext.Provider>
    )
}

export default CreateContext
