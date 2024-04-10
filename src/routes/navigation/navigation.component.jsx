import { Outlet, Link} from 'react-router-dom'
import {useContext} from 'react';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import './navigation.styles.scss'
import { signOutUser } from '../../utils/firebase/firebase.utils';


const Navigation = ()=>{
    const {currentUser, setCurrentUser} = useContext(UserContext);
    console.log(currentUser);


  return (
  <>
    <div className='navigation'>
        <Link className='nav-link' to='/'>
            <CrwnLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            {
                currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                    ): ( <Link className='nav-link' to='/auth'>
                SIGN IN
            </Link>)
                
            }
           
        </div>
    </div>
    <Outlet/>
  </>)
}
export default Navigation;