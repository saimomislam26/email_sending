import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ProjectContext } from '../Context/createContext'
const Navbar = () => {
    const { toggle } = useContext(ProjectContext)

    const RenderMenu = () => {
        if (toggle) {
            return (
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav ">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/sendemail"><span className="font-weight-bolder">SendEmail</span></NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/show"><span className="font-weight-bolder">ShowSchedule</span></NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout"><span className="font-weight-bolder">Logout</span></NavLink>
                        </li>
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav ">
                        <li className="nav-item">
                            <NavLink className="nav-link " to="/"><span className="font-weight-bolder">SignUp</span></NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login"><span className="font-weight-bolder">Login</span></NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/sendemail"><span className="font-weight-bolder">SendEmail</span></NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/show"><span className="font-weight-bolder">ShowSchedule</span></NavLink>
                        </li>
                    </ul>
                </div>
            )
        }
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" ><h1 className="color">Email<span className="folio">Sender</span></h1></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <RenderMenu />
                </div>
            </nav>
        </div>
    )
}

export default Navbar
