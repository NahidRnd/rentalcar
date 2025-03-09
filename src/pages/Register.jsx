import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users', { email, password });
      toast.success('User registered successfully!');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container w-500">
      <div className="bg-primary m-auto rounded-full w-55 h-55 pt-11">
        <HiOutlineLockClosed className="text-3xl text-white m-auto" />
      </div>
      <h2 className="text-3xl text-center font-bold mt-20">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col pt-50">
        <label htmlFor="email">Email</label>
        <input className="b-input mb-20" type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input className="b-input" type="text" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" className="btn btn--primary mt-30">Register</button>
        <Link className="text-center pt-15 text-primary" to="/login">Already have an account? Sign in</Link>
      </form>
    </div>
  )
}

export default Register
