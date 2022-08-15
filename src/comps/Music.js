import styles from "../styles/MusicPage.module.css";
import Navbar from "./Navbar";
import road_map from "../assests/road_map.png";
import music_icon from "../assests/music_icon.png";
import wawes from "../assests/wawes.png";
import img from "../assests/street_img.jpg";

const Music = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={img} alt="Home Image" />
        </div>
        <div className={styles.row}>
          <h2 className={styles.heading}>
            Every shatokens nft holders gets music when the road map unlocks.
          </h2>
          <img src={road_map} alt="Road Map" />
        </div>
        <div className={styles.row}>
          <img src={music_icon} alt="Road Map" />
          <h2
            className={styles.heading}
            style={{ marginLeft: "30px", textAlign: "right" }}
          >
            10,000 unique music pieces will be produced by pro producers
            individually.
          </h2>
        </div>
        <div className={styles.row}>
          <div>
            <h2 className={styles.heading} style={{ marginBottom: "1em" }}>
              What to do with it?!
            </h2>
            <p>
              you can either <b>rap on it or hop on it</b>
            </p>
            <p>
              you can also sell it to artists, brands, or even cinemas cause you
              have 100% ownership over it
            </p>
            <p>
              or you can just enjoy listening to it knowing that it's yours.
            </p>
          </div>
          <div className={styles.wawes_container}>
            <img src={wawes} alt="Road Map" />
            <img src={wawes} alt="Road Map" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Music;
