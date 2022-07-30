import { useContext } from "react";
import styles from '../styles/Navbar.module.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contextApi/AuthContext';

const Navbar = () => {

    const { isAuth } = useContext(AuthContext);
    return (
        <div className={styles.navContainer}>
            <div className={styles.rightNavItems}>
                <Link className="links" to="/"><div className={styles.navItem}>Home</div></Link>
                <Link className="links" to="/street"><div className={styles.navItem}>Street NFT</div></Link>
                <Link className="links" to="/music"><div className={styles.navItem}>MUSIC NFT</div></Link>
            </div>
            <div className={styles.rightNavItems}>  
                <Link to="/score" className="links"><div className={styles.navItem}>SHA POINTS</div></Link>
                <div className={styles.navItem}>STREET SHA TOKENS</div>
                { !isAuth && <>
                <Link to="/login" className="links"><div style={{color: "yellow", fontWeight: "900"}} className={styles.navItem}>LOGIN</div></Link>
                <Link to="/signup" className="links"><div style={{color: "yellow", fontWeight: "900"}} className={styles.navItem}>SIGNUP</div></Link>
                </> }
            </div>
        </div>

    );
}

export default Navbar;
