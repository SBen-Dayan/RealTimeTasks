import { useState } from "react"
import axios from "axios";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

    const { setUser } = useUser();
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', { email, password });
        if (!data) {
            setInvalidLogin(true);
        } else {
            await setUser(data);
            navigate('/');
        }
    }

    return <>
        <div className="row" style={{ alignItems: 'center' }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                {invalidLogin && <h4 style={{ color: 'red' }}>invalid login!!</h4>}
                <h3>Log in to your account</h3>
                <form onSubmit={onSubmit}>
                    <input type="text" name="email" placeholder="Email" className="form-control"
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <br />
                    <div className="input-group">
                        <input type={viewPassword ? "input" : "password"} name="password" placeholder="Password" className="form-control"
                            value={password} onChange={e => setPassword(e.target.value)} />
                        <div className="input-group-append">
                            <span onClick={() => setViewPassword(!viewPassword)} className="input-group-text">
                                <i className={viewPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                            </span>
                        </div>
                    </div>
                    <br />
                    <button className="btn btn-primary">Login</button>
                </form>
                <a href="/signup">Sign up for a new account</a>
            </div>
        </div >
    </>

}