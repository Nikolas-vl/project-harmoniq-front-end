import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';

const UserMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);


  return (
    <div className='flex gap-5'>
    <h2>Hello,{user.name}</h2> 
     <button onClick={() => dispatch(logOut())} className='btn btn-secondary'>
      Logout
    </button>
    </div>

  )
}

export default UserMenu