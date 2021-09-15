import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import _ from "lodash"
import { ProjectContext } from '../Context/createContext';
const Show = () => {
    const history = useHistory()
    const pageSize = 5;
    const { setMsg, Login, Logout } = useContext(ProjectContext);
    const [data, setData] = useState([])
    const [pagePost, setpagePost] = useState([])
    const [currPage, setcurrPage] = useState(1)


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
            const temp = await res.json();
            console.log(temp)
            if (temp.message) {

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

    // for getting all data
    const getData = async (e) => {

        const res = await fetch('http://localhost:4000/show', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const temp = await res.json();
        console.log(temp)
        setData(temp);
        setpagePost(_(temp).slice(0).take(pageSize).value())
        if (res.status === 400 || !data) {
            window.alert(temp.message)
            console.log(temp.message)
        }
        else {
            console.log(data)
        }

    }
    useEffect(() => {
        getData();
        callAboutPage();
        Login()


    }, []);

    console.log(pagePost)
    const count = Math.ceil(data.length / pageSize)
    // if (count === 1) return null;
    const pageNo = _.range(1, count + 1)

    const pagination = (page) => {
        console.log(`${currPage} I am from Pagination`)
        setcurrPage(page);
        const startIndex = (page - 1) * pageSize
        const currPost = _(data).slice(startIndex).take(pageSize).value()
        setpagePost(currPost)
    }
    const previous = () => {

        if (currPage <= count && currPage > 1) {
            const temp = currPage - 1
            // console.log(`${temp} previous`)
            setcurrPage(temp)
            // console.log(`${currPage} previous`)
            const startIndex = (currPage - 2) * pageSize
            const currPost = _(data).slice(startIndex).take(pageSize).value()
            setpagePost(currPost)
        }
        else {
            return pagePost
        }
    }
    const next = () => {
        console.log(`${currPage} I am from next`)
        if (currPage < count) {
            const temp = currPage + 1
            setcurrPage(temp)
            const startIndex = (currPage) * pageSize
            const currPost = _(data).slice(startIndex).take(pageSize).value()
            setpagePost(currPost)
            console.log(`${currPage} I am from next inside`)
        }
        else {

            return pagePost
        }


    }

    return (

        <div className="container mt-5">

            <table className="table table-striped table-bord" >
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Pending Status</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        pagePost.map((val, ind) => {
                            return (
                                <>
                                    <tr key={ind}>
                                        <th scope="row">{val._id}</th>
                                        <td>{val.email}</td>
                                        <td>{val.pending.toString()}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>


            <nav className="d-flex justify-content-center align-items-center">
                <button type="button" className="btn btn-primary mb-2" style={{ fontSize: "13px" }} onClick={previous}>
                    previous
                </button>
                <ul className="pagination mt-4">
                    {

                        pageNo.map((val, ind) => {
                            return (
                                <li className={val === currPage ? "page-item active" : "page-item"} key={ind}>
                                    <p className="page-link" onClick={() => pagination(val)}>
                                        {val}
                                    </p>
                                </li>
                            )

                        })
                    }

                </ul>
                <button type="button" className="btn btn-primary mb-2" style={{ fontSize: "13px" }} onClick={next} >
                    next
                </button>
            </nav>
        </div>
    )
}

export default Show
