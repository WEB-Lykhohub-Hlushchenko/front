import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
            <p>HarmonyStudio</p>
            </div>
            <nav>
                <a href="/">Home</a>
                <a href="/">FAQ</a>
                <a href="/">My profile</a>
            </nav>
        </header>
    );
};

export default Header;