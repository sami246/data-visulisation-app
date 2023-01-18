import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { DataContext} from '../context/DataContext';


function NavBar() {
  const {isChild} = useContext(DataContext);

  return (
    <div className="NavBar">
        <ul className="Nav">
        <li>
            <Link className="NavLink" to={"students"}>
            Home
            </Link>
        </li>
        { isChild != null &&
        <li>
            <p style={{"fontSize" : 15, "color" : isChild ? '#ffd51c' : '#ff9102', 'paddingLeft' : 10}}>
            {isChild === true && "Child View"}
            {isChild === false && "Parent/Teacher View"}
            </p>
        </li>
        }
        </ul>
    </div>
  )
}

export default NavBar