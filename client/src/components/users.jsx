// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const Users = () => {

    return (
        <div className="m-5">
            <div className="d-flex flex-columm justify-content-between">
                <div>
                    <p>Name: Karl</p>
                    <p>Alias: Kz</p>
                    <p>Email: kz@gmail.com</p>
                </div>
                <div>
                    <a className="pe-2" href="/bright_ideas">Bright Ideas</a>
                    <a href="/main">Logout</a>
                </div>
            </div>
            <hr />
            <div>
                <p>Total number of post: 3</p>
                <p>Total number of likes: 31</p>
            </div>
        </div>
    )
}

export default Users