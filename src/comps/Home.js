// import { Container } from "@mui/material";
import Navbar from "./Navbar";
import styles from "../styles/Home.module.css";
import img from "../assests/token_img.png";
import map from "../assests/map.png";
import dollar_sign from "../assests/dollar_sign.png";
import discord from "../assests/discord.png";
import twitter from "../assests/twitter.png";
import instagram from "../assests/instagram.png";
import home_img from "../assests/home_img.png";
import dc from "../assests/dc.mp4";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.topContainer}>
        <div className={styles.homeTopHeader}>
          <div className={styles.topLogo}>SHA TOKENS</div>
          <img src={dollar_sign} alt="Dollar Sign" />
          <div className={styles.socialIcons}>
            <img src={discord} alt="Discord" />
            <img src={twitter} alt="Twitter" />
            <img src={instagram} alt="instagram" />
          </div>
        </div>
        <div className={styles.headingMain}></div>
        <div className={styles.videoContainer}>
          <video src={dc} loop muted autoPlay></video>
          {/* <img src={home_img} alt="Home Image" /> */}
        </div>
        <div className={styles.introContainer}>
          <h1 className={styles.introHeading}>Welcome to sha tokens</h1>
          <div className={styles.flex1}>
            <ul className={styles.listItems}>
              <li className={styles.listItem}>
                Sha tokens is a collection of 10,000 unique nft living on
                ethereum blockchain.
              </li>
              <li className={styles.listItem}>
                Sha token is a pixelated nft of Satoshi Nakamoto, the{" "}
                <b>founder of Bitcoin</b>. It isn't just about the art. It's
                about the utilities, too.
              </li>
              <li className={styles.listItem}>
                Every token holder will receive <b>free music nft</b> without
                any artist tags, so each token holder will have 100% ownership
                over it.
              </li>
              <li className={styles.listItem}>
                Out of 10,000 tokens, 2,000 cannot be bought with money must be
                earned by effort, that is what makes them rare.
              </li>
              <li className={styles.listItem}>
                NFT owners receive 10k Sha points, which gives them a high
                chance of winning a treasure map.
              </li>
            </ul>
            <div>
              <img src={img} alt="tokens" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.hr}></div>
      <div className={styles.container2}>
        <h1 className={styles.introHeading2}>ROADMAP ACTIVATIONS</h1>
        <div className={styles.roadmapIntro}>
          <p className={styles.roadmapDesc}>We're in this for the long haul.</p>
          <p className={styles.roadmapDesc}>
            We've set up some goalposts for ourselves. Once we hit a target sell
            through percentage, we will begin to work on realizing the stated
            goals.
          </p>
          <p className={styles.roadmapDesc}></p>
        </div>
        <div className={styles.checkpoints}>
          <div className={styles.data}>
            <p className={styles.percentageKey}>10%</p>
            <p className={styles.valuePair}>
              200 tokens will be airdropped to early supporters.
            </p>
          </div>
          <div className={styles.data}>
            <p className={styles.percentageKey}>30%</p>
            <p className={styles.valuePair}>
              Merch unlocks with points addon features.
            </p>
          </div>
          <div className={styles.data}>
            <p className={styles.percentageKey}>60% </p>
            <p className={styles.valuePair}>
              Members will receive 10,000 music NFTs.
            </p>
          </div>
          <div className={styles.data}>
            <p className={styles.percentageKey}>80%</p>
            <p className={styles.valuePair}>
              15 treasure map NFTs will be awarded to the top 15 sha ponts
              holders.
            </p>
          </div>
          <div className={styles.data}>
            <p className={styles.percentageKey}>100%</p>
            <p className={styles.valuePairLast}>
              The top three holders of Sha points receive 3 physical treasure
              map.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.hr}></div>
      <div className={styles.container2}>
        <h1 className={styles.introHeading2}>The Treasure Map</h1>
        <div className={styles.flex2}>
          <div className={styles.mapContent}>
            Certainly not a treasure map; perhaps it is more than that. Here we
            have 15 physical maps that were minted in 1875 and after. An
            individual map costs millions of dollars because of there antique
            value. These 15 maps were minted between 1875 and 1910. It's worth
            everything that Albert Einstein wasn't even born in 1875 if you
            think that 1875 is not old enough.Even the light bulb was invented
            after five years from the mint date you can now win these maps by
            owning a sha token. Out of these maps, only 15 NFTs will be made and
            members will even have a chance to win 3 original physical maps.
          </div>
          <div>
            <img src={map} alt="Treasure Map" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
