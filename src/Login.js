import React, {useState} from 'react';
import './Login.css';
import axios from "axios";


async function loginUser(credentials) {
    try {
        return {
            token: await axios.post('http://52.56.192.168:443/accounts/login', JSON.stringify(credentials)),
            incorrect: null
        }

        } catch (e) {
        console.log(`Error! status: ${e}`)
        return {
            token: null,
            incorrect: "Incorrect Password"
        };
    }
}
export default function Login({ setToken }) {

    const [email, setUserName] = useState();
    const [password, setPassword] = useState();
    const [incorrect, setIncorrect] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const {token, incorrect} = await loginUser({
            email,
            password
        });
        setIncorrect(incorrect)
        if(!token) {
            return
        }
        setToken(token.data[0]);
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <h1 style={{ color: 'red' }}>{incorrect}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}