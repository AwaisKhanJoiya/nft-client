import styles from "../styles/StreetPage.module.css";
import Navbar from "./Navbar";
import location from "../assests/location.png";
import map_img from "../assests/map_img.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Scanner from "./Scanner";

const Street = () => {
  const [reedomCode, setReedomCode] = useState("");
  const [scanner, setScanner] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e && e.preventDefault();

    try {
      const res = await fetch("https://api.shatokens.com/validatecoupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reedomCoupon: reedomCode }),
      });

      if (res.status === 500) {
        const data = await res.json();
        alert(data.error);
      } else {
        const data = await res.json();
        if (data) {
          navigate("/wallet", { state: { valid: true } });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {scanner && <Scanner onHide={() => setScanner(false)} />}
      <div className={styles.container}>
        <div className={styles.musicImgContainer}>
          <div>
            <h2 className={styles.logo}>STREET SHA TOKENS</h2>
            <p className={styles.subheading}>
              Taking NFTs to the real world for the first time
            </p>
          </div>
          <h3
            className={styles.heading}
            style={{ textAlign: "right", marginTop: "20px" }}
          >
            Imagine roaming the streets of New York City and getting the rarest
            NFT
            <br />
            Yes, that is what this is about.
          </h3>

          <div className={styles.row} style={{ margin: "2em 0" }}>
            <div>
              <h3 className={styles.heading}>There are two ways:</h3>
              <div className={styles.row} style={{ margin: "2em 0" }}>
                <p className={styles.subheading}>Physical</p>
                <span style={{ margin: "0 2rem" }}>-</span>
                <p className={styles.subheading}>
                  Find an SHA tokens QR that will be posted on the streets and
                  scan it.
                  <br />
                  <span>
                    (The QR will be posted by agents assigned by SHA tokens)
                  </span>
                </p>
              </div>
              <div className={styles.row} style={{ margin: "2em 0" }}>
                <p className={styles.subheading}>Digital</p>
                <span style={{ margin: "0 2rem" }}>-</span>
                <p className={styles.subheading}>
                  we will drop a link in sha tokens social media and you need to
                  travel to a certain street or geolocation to access the ticket
                  <br />
                  <span>
                    (if you have the link, the NFT will be unlocked when you
                    reach the specific location)
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.location_icon}>
              <img src={map_img} alt="map" />
              <img
                src={location}
                className={styles.location}
                alt="location icon"
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p
              className={styles.subheading}
              style={{ textAlign: "right", width: "30%" }}
            >
              NOTE - The NFTs which you will get here is the 2000 tokens which
              was held back from the entire collections which is not for sale
            </p>
          </div>
        </div>

        <h2 className={styles.formHeader}>
          ENTER THE CODE HERE TO CLAIM YOUR NFT
        </h2>
        <h2 className={styles.formHeader}>
          OR{" "}
          <button
            className={styles.btn}
            onClick={() => setScanner(true)}
            style={{ padding: "0.3rem 1rem", marginLeft: "1rem" }}
          >
            SCAN QR
          </button>
        </h2>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className={styles.form}
        >
          <input
            value={reedomCode}
            className={styles.reedomField}
            onChange={(e) => setReedomCode(e.target.value)}
            type="text"
          />
          <button type="submit" className={styles.btn}>
            VERIFY
          </button>
        </form>
      </div>
    </>
  );
};

export default Street;
