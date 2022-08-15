import Navbar from "./Navbar";
import styles from "../styles/Points.module.css";
import styles2 from "../styles/Navbar.module.css";
import ABI from "../abi/abi.json";
import { useEffect, useState, useContext } from "react";
// import { useCookies } from 'react-cookie'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from "../contextApi/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Points = () => {
  const [cookie, setCookie] = useCookies();

  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(cookie.user);

  // const [hide, setHide] = useState(true)

  const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const [cookies, setCookies] = useCookies();

  // const { isAuth } = useContext(AuthContext);
  const handleClick = async () => {
    if (user) {
      try {
        const res = await fetch("https://api.shatokens.com/addUserLinks", {
          method: "POST",
          body: JSON.stringify({ url, user: cookie.user?._id }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.status === 201) {
          alert("Link added sent!");
          navigate("/");
        } else {
          alert("We are facing some problems. Please try again later.");
        }
      } catch (error) {
        // console.log("hillo")
        console.log(error);
      }
    } else {
      alert("Please Login First!");
    }
  };

  useEffect(() => {
    addPoints();
  }, []);

  const addPoints = async () => {
    const web3 = window.web3;
    if (!web3.eth) {
      alert("Please connect with matamask!");
      navigate("/");
    } else {
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(
        ABI,
        "0xeDF9A071bc9a5BA5959b186f3c50a1Bb8C2b22e2"
      );

      const balance = await contract.methods.balanceOf(accounts[0]).call();
      const res = await fetch("https://api.shatokens.com/addNftPoints", {
        method: "POST",
        body: JSON.stringify({
          id: cookie.user?._id,
          points: parseInt(balance) * 10000,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.status === 201) {
        setUser(data.user);
        // navigate("/");
      } else {
        alert("We are facing some problems. Points are not refreshed!");
      }
    }
  };
  // const navigate = useNavigate()

  // const checkUser = async() => {
  //     try {
  //         const res = await fetch('https://api.shatokens.com/checkuser', {
  //             method: 'POST',
  //             headers: {'Content-Type': 'application/json'},
  //             body: JSON.stringify({token: cookies.jwt})
  //         })
  //         const data = await res.json()
  //         if(data.status === "bad auth"){
  //             console.log("bad auth user")
  //             alert("Dekho pehle login kaaro")
  //             setOpen(true)
  //             setLogin(true)
  //             console.log(open, login)
  //             navigate('/test', { replace: true})
  //         } else if(data.status === "good auth"){
  //             console.log("Sab badiya")
  //             setHide(false)
  //         }
  //     } catch (error) {
  //         console.log("error: ", error)
  //     }
  // }

  // useEffect(() => {
  //     checkUser()
  // }, [])

  return (
    <>
      <div className={styles2.navContainer}>
        <div className={styles2.rightNavItems}>
          <Link className="links" to="/">
            <div className={styles2.navItem}>Home</div>
          </Link>
        </div>
        {user ? (
          <div className={styles.rightNavItems}>
            <div className={styles.topBox}>
              {user?.firstName + " " + user?.lastName}
            </div>
            <span className={styles.line}></span>
            <div className={styles.topBox}>
              {user?.nftPoints + user?.otherPoints}
            </div>
          </div>
        ) : (
          <div className={styles.rightNavItems}>
            <Link className="links" to="/login">
              <div className={styles.topBox}>Login</div>
            </Link>
            <span className={styles.line}></span>
            <Link className="links" to="/signup">
              <div className={styles.topBox}>Signup</div>
            </Link>
          </div>
        )}
      </div>
      {/* { !hide && */}
      <div className={styles.container}>
        <h1 className={styles.topHeader}>TOP 10</h1>
        <p className={styles.scoreHolderText}>SCORE HOLDERS</p>

        <div className={styles.scoreHolders}>
          {players.map((player) => {
            return (
              <div key={player} className={styles.player}>
                <div className={styles.names}>
                  <p className={styles.index}>1</p>
                  <p className={styles.name}>George W. Bush</p>
                </div>
                <div className={styles.point}>POINTS</div>
              </div>
            );
          })}
        </div>

        <div className={styles.container2}>
          <h2 className={styles.heading2}>
            The treasure map can only be won ny earning SHA POINTS
          </h2>
          <h2 className={styles.subHeading}>Ways to get sha points</h2>
          <li className={styles.listItem}>
            The members who purchases the NFT will get 10k Sha points.
          </li>
          <li className={styles.listItem}>
            when someone buys merch they even get points addon.
          </li>
          <li className={styles.listItem}>
            whenever you talk or do promo about Sha tokens on your social
            networks, submit that link here and you'll get great number of sha
            points.
          </li>
          <p className={styles.note}>
            It can be any platform ( youtube, twitter, instagram, reels, memes,
            twitch, discord ) Example ( make a youtube video explaining sha
            tokens or part of it )
          </p>
        </div>
        <div className={styles.formContainer}>
          <p className={styles.note2}>
            ( points will be assigned as per the quality of the content,
            duration and insights. )
          </p>
          <input
            className={styles.urlField}
            type="text"
            placeholder="Submit your links here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className={styles.btn} onClick={handleClick}>
            SUBMIT
          </button>
        </div>
      </div>
      {/* } */}
    </>
  );
};

export default Points;
