import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import Message from '../Alert/Message';
import { ProjectContext } from '../Context/createContext'
const Sendemail = () => {
    //For Handling  Scheduler 
    let mnt = []
    let hr = []
    let i = 0
    for (i = 0; i < 60; i++) {
        mnt.push(i);
    }
    for (i = 0; i < 24; i++) {
        hr.push(i);
    }

    let [minute, setMinute] = useState("")
    let [hour, setHour] = useState("")

    const { user, getUserMail, clearUser, setMsg, Login, Logout } = useContext(ProjectContext);
    const history = useHistory();
    //Form Control
    const [mail, setMail] = useState({
        to: "", from: "", subject: "", text: "", password: ""
    })

    const [message, setMessage] = useState("")
    let name, value

    const eventHandle = (e) => {

        name = e.target.name
        value = e.target.value

        setMail({ ...mail, [name]: value })

    }

    // Will call after first render
    const callAboutPage = async () => {

        try {
            const res = await fetch('http://localhost:4000/send', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'

            })
            const data = await res.json();
            console.log(data)
            if (data.message) {
                setMsg("You Have to Login First")
                Logout()
                history.push('/login')

            }
            if (!res.status === 200) {
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        callAboutPage();
        Login();
    }, []);
    var count = 0

    //After Clicking Send Mail
    const sendMail = async (e) => {
        e.preventDefault();
        const { subject, text, from, to, password } = mail
        getUserMail(to)
        console.log(user.length)
        user.map(async email => {
            count++;
            const res = await fetch('http://localhost:4000/sendmail', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from, subject, text, email, password, minute, hour
                })
            })
            const temp = await res.json();

            if (res.status === 400) {
                clearUser();
                setMessage(temp.message)
                Login()
            }
            else if (res.status === 500) {
                setMessage("Give A Valid Email")
                Login()
            }
            else {
                setMessage(temp.message)
                if (count === user.length) {
                    clearUser();
                    setMail({
                        from: "",
                        to: "",
                        password: "",
                        text: "",
                        subject: ""
                    })
                    setMinute("")
                    setHour("")
                    Login();
                }
            }

        })
    }

    return (
        <div className="container mt-5">
            {
                message ? <Message message={message} /> : null
            }
            <div className="signup-form ">
                <div className="signup-content border-light row">

                    <h1 className="text-center">Send Mail</h1>
                    <div className="col-md-8">
                        <form method="POST" >
                            <div className="form-row  d-flex justify-content-center">
                                <div className="form-group mt-5  " style={{ width: "72%" }}>

                                    <label htmlFor="inputName">To</label>

                                    <input type="text" className="form-control" name="to"
                                        value={mail.to} onChange={eventHandle} placeholder="Receiver Email" required="required" />
                                </div>

                            </div>
                            <div className="form-row  d-flex justify-content-center">
                                <div className="form-group mt-3  " style={{ width: "72%" }}>

                                    <label htmlFor="inputName">From</label>

                                    <input type="text" className="form-control" name="from"
                                        value={mail.from} onChange={eventHandle} placeholder="Sender Email" required="required" />
                                </div>

                            </div>
                            <div className="form-row  d-flex justify-content-center">
                                <div className="form-group mt-3" style={{ width: "72%" }}>

                                    <label htmlFor="inputName">Password</label>

                                    <input type="password" className="form-control" name="password"
                                        value={mail.password} onChange={eventHandle} placeholder="Password"
                                        required="required" />

                                </div>
                            </div>

                            <div className="form-row  d-flex justify-content-center">
                                <div className="form-group mt-3 " style={{ width: "72%" }}>

                                    <label htmlFor="inputName">Subject</label>


                                    <input type="text" className="form-control" name="subject"
                                        value={mail.subject} onChange={eventHandle} placeholder="Email Subject" required="required" />

                                </div>
                            </div>
                            <div className="form-row  d-flex justify-content-center">
                                <div className="form-group " style={{ width: "72%" }}>

                                    <label htmlFor="inputMessage">Body</label>

                                    <textarea class="form-control" name="text" onChange={eventHandle} value={mail.text}></textarea>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                                <button type="button" className="btn btn-primary mb-2 " onClick={sendMail} >
                                    send Mail
                                </button>
                            </div>


                        </form>

                    </div>

                    {/* select Box */}

                    <div className="col-md-4">
                        <select className="form-select form-select-sm mt-5" aria-label=".form-select-sm example"
                            onChange={(e) => {
                                const selectedMinute = e.target.value
                                setMinute(selectedMinute)
                            }} >
                            <option selected>Minute</option>
                            {
                                mnt.map((val, ind) => {
                                    return <option value={val}>{val}</option>
                                })
                            }

                        </select>
                        <select className="form-select form-select-sm mt-3" aria-label=".form-select-sm example" onChange={(e) => {
                            const selectedHour = e.target.value
                            setHour(selectedHour)
                        }}>
                            <option selected>Hour</option>
                            {
                                hr.map((val, ind) => {
                                    return <option value={val}>{val}</option>
                                })
                            }
                        </select>

                    </div>


                </div>

            </div>
        </div>
    )
}

export default Sendemail

