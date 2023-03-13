// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const PeopleLike = () => {

    const userName = "Karl";
    const textExample = "This is a text example of how it will look";
    const aliasName = "Kz"

    return (
        <div className="m-5">
            <div className="d-flex flex-columm justify-content-end">
                <a className="pe-2" href="/bright_ideas">Bright Ideas</a>
                <a href="/main">Logout</a>
            </div>
            <div className="mb-5">
                <label className="my-1"> <a href="/bright_ideas" className="pe-1">{userName}</a>says:</label>
                <p className="my-1 col-7 p-1 border border-2 border-dark">{textExample}</p>
            </div>
            <div>
                <p className="fw-bold">People who liked this post:</p>
                <table className="table table-striped table-bordered border-dark">
                    <tbody>
                        <tr>
                            <th>Alias</th>
                            <th>Name</th>
                        </tr>
                        <tr>
                            <td><a href="/users/1"> {aliasName}</a></td>
                            <td>{userName}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PeopleLike