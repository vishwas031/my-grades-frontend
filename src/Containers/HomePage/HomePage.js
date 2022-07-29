import React from 'react';
import UserCard from '../../Components/UserCard/UserCard';
import styles from './HomePage.module.css'

function HomePage() {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1>YOUR <span>USER</span> TYPE</h1>
                <div className={styles.card}>
                    <UserCard user="Admin"/>
                    <UserCard user="Student"/>
                    <UserCard user="Verifier"/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;