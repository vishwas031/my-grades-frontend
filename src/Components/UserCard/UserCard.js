import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/User/UserActions';
import styles from './UserCard.module.css'
import { useHistory } from 'react-router-dom';
import { BsBuilding } from 'react-icons/bs';
import { FaUserGraduate} from 'react-icons/fa';
import {RiShieldUserLine} from 'react-icons/ri';

function UserCard(props) {
    const dispatch= useDispatch()
    const history = useHistory();

    function landing(user){
        dispatch(setUser(user));
        history.push('/landing')
    }
    return (
        <div className={styles.container} onClick={()=>landing(props.user)}>
            { props.user=='Admin' && <RiShieldUserLine/>}
            { props.user=='Student' && <FaUserGraduate/>}
            { props.user=='Verifier' && <BsBuilding/>}

            {props.user}
        </div>
    );
}

export default UserCard;