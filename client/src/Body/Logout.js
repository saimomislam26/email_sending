import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ProjectContext } from '../Context/createContext'

const Logout = () => {
    const { Logout } = useContext(ProjectContext)
    const history = useHistory()
    const logOutUser = async (e) => {

        const res = await fetch('http://localhost:4000/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        if (res.status !== 200) {
            const error = new Error(res.error)
            throw error
        }
        else {
            Logout()
            history.push('/login')
        }
        // window.alert("You Are Logged Out");

    }
    useEffect(() => {
        logOutUser()
    })
    return (
        <div>

        </div>
    )
}

export default Logout
