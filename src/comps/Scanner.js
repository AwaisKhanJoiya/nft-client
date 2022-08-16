import React, { useState } from "react";
import styles from "../styles/Scanner.module.css";
import { useNavigate } from "react-router-dom";
import QrReader from "react-qr-scanner";

const Scanner = ({ onHide }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleScan = async (data) => {
    if (data !== null) {
      setLoading(true);
      try {
        const res = await fetch("https://api.shatokens.com/validatecoupon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reedomCoupon: data?.text }),
        });

        if (res.status === 500) {
          const data = await res.json();
          alert(data.error);
          onHide();
        } else {
          const data = await res.json();
          if (data) {
            navigate("/wallet", { state: { valid: true } });
          }
        }
      } catch (error) {
        console.log(error);
        onHide();
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className={styles.mainContainer} onClick={onHide}>
      <div className={styles.scannerContainer}>
        {!loading ? (
          <QrReader
            delay={300}
            facingMode="rear"
            className={styles.scanner}
            onError={handleError}
            onScan={handleScan}
          />
        ) : (
          <p style={{ textAlign: "center" }}>Checking, Please wait...</p>
        )}
      </div>
    </div>
  );
};

export default Scanner;
