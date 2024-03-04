import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/register/', {
                username,
                password,
            });
            console.log('register', response.data);
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='card-2'>
            <h1>Registro</h1>
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='form-control m-3'
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='form-control m-3'
            />
            <div className='centrado'>
                <button 
                onClick={handleRegister}
                className='btn btn-primary'>Registrar
                </button>
            </div>
        </div>
    );
};

export default Register;
