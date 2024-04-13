import Directory from '../../component/directory/directory.component'
import {Outlet} from 'react-router-dom'

const Home = () => {
    
    return (
        <>
      <Directory/>
      <Outlet/>

      </>
    );
  };
  
  export default Home;
  