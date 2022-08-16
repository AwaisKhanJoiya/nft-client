import { useContext, useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { AuthContext } from "../contextApi/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    if (window.web3?.eth) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, []);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const w = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      //   console.log(w[0]);
      setIsConnected(true);
      //   setWallet(w[0]);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      // window.ethereum
      //   .request({ method: "eth_requestAccounts" })
      //   .then((result) => {
      //     console.log("Wallet Connected");
      //     console.log(result[0]);
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });
    } else {
      alert("Need to install MetaMask");
      // setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.rightNavItems}>
          {/* <Link className="links" to="/">
          <div className={styles.navItem}>Home</div>
        </Link> */}
          <a href="https://mint.shatokens.com" className="links">
            <div className={styles.navItem}>BUY NFT</div>
          </a>
          <Link className="links" to="/music">
            <div className={styles.navItem}>MUSIC NFT</div>
          </Link>
        </div>
        <div className={styles.rightNavItems}>
          <Link to="/score" className="links">
            <div className={styles.navItem}>SHA POINTS</div>
          </Link>
          <Link className="links" to="/street">
            <div className={styles.navItem}>STREET SHA TOKENS</div>
          </Link>
          {!isConnected && (
            <>
              <div
                onClick={connectWalletHandler}
                style={{
                  color: "yellow",
                  fontWeight: "900",
                  cursor: "pointer",
                }}
                className={styles.navItem}
              >
                Connect Wallet
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.mobNav}>
        <div className={styles.mobNavContainer}>
          <div className={styles.rightNavItems}>
            <Link to="/" className="links">
              <div className={styles.topLogo}>SHA TOKENS</div>
            </Link>
          </div>
          <div
            onClick={() => setIsActive(!isActive)}
            className={styles.rightNavItems}
          >
            <MenuIcon fontSize="large" />
          </div>
        </div>
        <div className={`${styles.mobMenu} ${isActive && styles.active}`}>
          <a href="https://mint.shatokens.com" className="links">
            <div className={styles.navItem}>BUY NFT</div>
          </a>
          <Link className="links" to="/music">
            <div className={styles.navItem}>MUSIC NFT</div>
          </Link>
          <Link to="/score" className="links">
            <div className={styles.navItem}>SHA POINTS</div>
          </Link>
          <Link className="links" to="/street">
            <div className={styles.navItem}>STREET SHA TOKENS</div>
          </Link>
          {!isConnected && (
            <>
              <div
                onClick={connectWalletHandler}
                style={{
                  color: "yellow",
                  fontWeight: "900",
                  cursor: "pointer",
                }}
                className={styles.navItem}
              >
                Connect Wallet
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
