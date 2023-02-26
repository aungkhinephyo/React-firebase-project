import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Navbar = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const logout = async () => {
        await signOut(auth);
        navigate('/')
        
    }

    return (
        <div className='navbar'>
            <div className='links'>
                {!user ? <Link to="/login">Login</Link> : <></>}
                <Link to="/">Home</Link>
                {!user ? <></> : <Link to="/create">Create Post</Link>}
                
            </div>

            {user &&
                (<div className='user'>
                    <p>{user?.displayName}</p>
                    <img src={user?.photoURL || ""} alt="profile"/>
                </div>)
            }
            
            {user && <button className='btn' onClick={logout} >Logout</button>}
        </div>
    );
}