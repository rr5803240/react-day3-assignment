
import { BiLoader } from 'react-icons/bi';
import './Loader.css';

const Loader =()=>{
  return (
    <div className="loaderStyle">
        <p><BiLoader/></p>
        <p>Loading ...</p>
    </div>
  )
}

export default Loader;