import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginRegister = () => {
    const [name, setName] = useState('');
    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showLabel, setShowLabel] = useState(false);
    const [showLabel2, setShowLabel2] = useState(false);
    const navigate = useNavigate()

    const validatePassword = (e) => e.target.value.length < 8
        ? setShowLabel(true)
        : setShowLabel(false)

    const validateBothPasswords = () => confirmPassword !== password
        ? setShowLabel2(true)
        : setShowLabel2(false)

    const submitHandlerRegister = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/registro', {
                name, alias, email, password
            }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                alert('Usuario registrado!!');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const submitHandlerLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email, password
        }, { withCredentials: true, credentials: 'include' })
            .then((res) => {
                alert('Usuario logueado!!');
                localStorage.setItem('user', res.data.name);
                localStorage.setItem('alias', res.data.alias);
                localStorage.setItem('email', res.data.email);

                navigate('/bright_ideas');
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='d-flex flex-row m-5 justify-content-between'>
            <div className='col m-2 p-4 border border-2 border-dark position-relative'>
                <label htmlFor='register' className='px-2 fs-5 position-absolute top-0 start-50 translate-middle bg-white'>Register</label>
                <form onSubmit={submitHandlerRegister}>
                    <div className="d-flex flex-row mb-2" >
                        <label htmlFor='name' className='col col-form-label'>Name:</label>
                        <input className='col form-control' type='text' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="d-flex flex-row mb-2" >
                        <label htmlFor="alias" className='col col-form-label'>Alias:</label>
                        <input className='col form-control' type='text' onChange={(e) => setAlias(e.target.value)} />
                    </div>
                    <div className="d-flex flex-row mb-2" >
                        <label htmlFor="email" className='col col-form-label'>Email:</label>
                        <input className='col form-control' type='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="d-flex flex-row mb-2" >
                        <label htmlFor="password" className='col col-form-label'>Password:</label>
                        <input className='col form-control' type='password' onBlur={validatePassword} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {showLabel === true && (
                        <label htmlFor='passwordmessage' className='text-danger'>*Password should be at least 8 characters</label>
                    )}
                    <div className="d-flex flex-row mb-2" >
                        <label htmlFor="confirmpassword" className='col col-form-label'>Confirm Password:</label>
                        <input className='col form-control' type='password' onBlur={validateBothPasswords} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {showLabel2 === true && (
                        <label htmlFor='notmatchpassword' className='text-danger'>*Passwords do not match!</label>
                    )}
                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-success mt-3'>Register</button>
                    </div>
                </form>
            </div>
            <div className='col m-2 p-4 border border-2 border-dark position-relative'>
                <form onSubmit={submitHandlerLogin}>
                    <label htmlFor='login' className='px-2 fs-5 position-absolute top-0 start-50 translate-middle bg-white'>Login</label>
                    <div className="d-flex flex-row mb-2" >
                        <label htmlFor="emaillogin" className='col col-form-label'>Email:</label>
                        <input type="text" className='col form-control' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="d-flex flex-row mb-2" >
                        <label htmlFor="passwordlogin" className='col col-form-label'>Password:</label>
                        <input type="password" className='col form-control' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-success mt-3'> Login</button>
                    </div>
                </form>
            </div>
        </div >
    )
}
export default LoginRegister