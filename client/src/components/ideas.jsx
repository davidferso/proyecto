import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BrightIdeas = () => {
    const [ideas, setIdeas] = useState([]);
    const [idea, setIdea] = useState('');
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const alias = localStorage.getItem('alias');
    const email = localStorage.getItem('email');

    useEffect(() => {
        axios.get('http://localhost:8000/api/obtenerideas', { withCredentials: true })
            .then((res) => {
                console.log(res)
                setIdeas(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, []);

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/crearidea', {
            idea,
            like: {
                user,
                alias,
                email
            }
        }).then((res) => {
            console.log(res);
            const newIdea = res.data;
            setIdeas([...ideas, newIdea]); 
            setIdea(''); 
        }).catch((err) => {
            console.log(err)
        })
    };

    const logoutHandler = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        axios
            .get('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="m-5">
            <div className='d-flex flex-row justify-content-between'>
                <p>Hi {alias}</p>
                <a href='#' onClick={logoutHandler} className='link-primary'>Logout</a>
            </div>
            <div className="px-5">
                <form onSubmit={submitHandler}>
                    <div className='d-flex flex-row m-5 justify-content-between'>
                        <input className="col form-control" type="text" placeholder="Post something witty here" onChange={(e) => setIdea(e.target.value)}></input>
                        <button className="btn mx-5 btn-success">Idea!</button>

                    </div>
                </form>
                {
                    ideas.map((idea) => (
                        <div className="m-5" key={idea._id}>
                            <label className="my-1"> <a href="/users/1" className="pe-1">{idea.like.alias}</a>says:</label>
                            <p className="my-1 col-7 p-1 border border-2 border-dark">{idea.idea}</p>
                            <div className="d-flex flex-row">
                                <a href="/bright_ideas" className="pe-1">Like</a>
                                <span><a href="/bright_ideas/1" className="pe-1">31 people</a>like this.</span>
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default BrightIdeas