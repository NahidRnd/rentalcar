import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineLockOpen } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();

        if (!email || !password) {    
            toast.error("Please fill in both fields.");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);
            if (response.data.length > 0) {
                toast.success('Login successful!');
                localStorage.setItem('user', JSON.stringify(response.data[0]));
                navigate('/');
            } else {
                toast.error('Invalid email or password.');
            }
        } catch (error) {
            toast.error(error);
        }
    }

  return (
    <div className="container w-500">
      <div className="bg-primary m-auto rounded-full w-55 h-55 pt-11">
        <HiOutlineLockOpen className="text-3xl text-white m-auto" />
      </div>
      <h2 className="text-3xl text-center font-bold mt-20">Sign in</h2>
      <form onSubmit={handleSubmit} className="flex flex-col pt-50">
        <label htmlFor="email">Email</label>
        <input className="b-input mb-20" type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input className="b-input" type="text" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" className="btn btn--primary mt-30">Sign in</button>
        <Link className="text-center pt-15 text-primary" to="/register">Don't have an account? Sign Up</Link>
      </form>
    </div>
  )
}

export default Login
