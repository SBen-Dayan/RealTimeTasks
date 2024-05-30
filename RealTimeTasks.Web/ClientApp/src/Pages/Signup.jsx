import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

export default function Signup() {
    const navigate = useNavigate();
    const {setUser } = useUser();
    
    const [inputUser, setInputUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const onTextChange = ({ target: { name, value } }) => {
        const newState = { ...inputUser };
        newState[name] = value;
        setInputUser(newState);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const {data} = await axios.post('/api/account/signup', inputUser);
        await setUser(data);
        navigate('/');
    }

    const { firstName, lastName, email, password } = inputUser;
    return <>
        <div className="row" style={{ alignItems: 'center' }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Sign up for a new account</h3>
                <form onSubmit={onSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" className="form-control"
                        value={firstName} onChange={onTextChange} />
                    <br />
                    <input type="text" name="lastName" placeholder="Last Name" className="form-control"
                        value={lastName} onChange={onTextChange} />
                    <br />
                    <input type="text" name="email" placeholder="Email" className="form-control"
                        value={email} onChange={onTextChange} />
                    <br />
                    <input type="password" name="password" placeholder="Password" className="form-control"
                        value={password} onChange={onTextChange} />
                    <br />
                    <button className="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    </>
}