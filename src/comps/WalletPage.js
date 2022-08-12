import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "../styles/WalletPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const WalletPage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state?.valid) {
      navigate("/");
    }
  }, [location]);
  const handleClick = async () => {
    try {
      const res = await fetch("https://api.shatokens.com/addwallet", {
        method: "POST",
        body: JSON.stringify({ walletAddress }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.status === 201) {
        alert("Address sent!");
        navigate(location.pathname, { state: { valid: false } });
      } else {
        alert("We are facing some problems. Please try again later.");
      }
    } catch (error) {
      // console.log("hillo")
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div>
          <h3 className={styles.smallHeading}>Congratulations</h3>
          <h2 className={styles.heading}>you won a sha token</h2>

          <div className={styles.addressBox}>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <button onClick={handleClick}>Submit</button>
          </div>
          <h2 className={styles.subHeading}>
            Enter your ethereum wallet address here
          </h2>
          <p className={styles.smallText}>
            Your nft will be sent to your wallet in 24 hours
          </p>
        </div>
      </div>
    </>
  );
};

export default WalletPage;
