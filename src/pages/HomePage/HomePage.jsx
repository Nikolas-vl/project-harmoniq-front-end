import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authOperations";
import { selectUserToken } from "../../redux/auth/authSelectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = e =>{
    e.preventDefault()
    dispatch(login({email,password}))
  }
  const token = useSelector(selectUserToken)
  return (

  <form onSubmit={handleSubmit}>
    <input type='email' onChange={e => setEmail(e.target.value)} value = {email}/>
    <input type='password' onChange={e => setPassword(e.target.value)} value = {password}/>
    <p>{token}</p>
    <button type = 'submit' >BTN </button>
  </form>
  )
};

export default HomePage;
