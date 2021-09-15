import React, { useState, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { ProjectContext } from '../Context/createContext'
import login from '../images/login.png'
import Message from '../Alert/Message'

const Login = () => {
    const { Login, msg, clearMessage } = useContext(ProjectContext);
    const history = useHistory()
    const [user, setUser] = useState({
        email: "", password: ""
    })
    const [message, setMessage] = useState("")
    let name, value;
    const eventHandle = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = user
        const res = await fetch('http://localhost:4000/login', {
            method: "POST",
            // mode: 'cors',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            }),
            credentials: 'include'
        })
        const data = await res.json()
        if (res.status === 400) {
            clearMessage()
            setMessage(data.message)

        }
        else {
            clearMessage()
            setMessage("login successful")
            Login()
            history.push('/sendemail')


        }

    }

    return (
        <div className="mt-5 container">
            {
                msg ? <Message message={msg} /> : null
            }

            {
                message ? <Message message={message} /> : null
            }
            <div class="login-form">
                <div className="login-content">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="text-center">Sign In</h1>
                            <form method="POST">
                                <div className="form-group mt-5">
                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-paper-plane"></span>
                                            </span>
                                        </div>
                                        <input type="email" className="form-control" name="email" value={user.email} onChange={eventHandle} placeholder="Email Address" required="required" />
                                    </div>


                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-lock"></span>
                                            </span>
                                        </div>
                                        <input type="password" className="form-control" name="password" value={user.password} onChange={eventHandle} placeholder="password" required="required" />
                                    </div>

                                    <div className="form-group for-btn">
                                        <button type="submit" onClick={loginUser} className="btn btn-primary btn-lg mt-3">Sign In</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="col-md-6">
                            <div className="another">
                                <img src={login} alt="login" className="img-fluid mt-5" style={{ height: "200px", width: "200px" }} />
                                <h5>Not Registered?</h5>
                                <NavLink to="/" style={{ color: "#BF252B", fontSize: "1.5rem" }}>Signup here</NavLink>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Login
