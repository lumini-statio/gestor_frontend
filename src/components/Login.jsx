// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/login/', {
                username,
                password,
            });
            console.log('login',response.data);
            navigate('/meses')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='card-2'>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='form-control my-3'
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='form-control my-3'
            />
            <button className='btn btn-primary' onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
};

export default Login;
