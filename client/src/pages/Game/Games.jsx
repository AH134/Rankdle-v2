import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import rankIconsList from "../../utils/rankIconsList";
import RankIcon from "../../components/RankIcon";
import styles from "./Game.module.css";

const loader = ({ params }) => {
  if (!rankIconsList[params.name]) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    rankIcons: rankIconsList[params.name],
    // temp video data
    videoData: [
      {
        id: 0,
        link: "https://www.youtube-nocookie.com/embed/9B0yX0UIN9M",
        rank: {
          name: "bronze",
        },
      },
      {
        id: 1,
        link: "https://www.youtube-nocookie.com/embed/oxZodeEg3Fo",
        rank: {
          name: "challenger",
        },
      },
      {
        id: 2,
        link: "https://www.youtube-nocookie.com/embed/bmFhjPYfvjA",
        rank: {
          name: "silver",
        },
      },
    ],
  };
};

function Games() {
  const { rankIcons, videoData } = useLoaderData();
  const [selectedRank, setSelectedRank] = useState({});
  const [currentVideo, setCurrentVideo] = useState(videoData[0]);
  console.log(currentVideo);

  useEffect(() => {
    const resetSelectedRank = () => {
      setSelectedRank({});
    };
    resetSelectedRank();
  }, [rankIcons, currentVideo]);

  return (
    <>
      <div>stars</div>
      <div className={styles.videoContainer}>
        {" "}
        <iframe
          src={currentVideo.link}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div>
      <div>
        <div>level</div>
        <div className={styles.rankIconContainer}>
          {rankIcons &&
            rankIcons.map((rank, index) => (
              <RankIcon
                key={index}
                rank={rank}
                selectedRank={selectedRank.name || ""}
                setSelectedRank={setSelectedRank}
              />
            ))}
        </div>
        <p>
          Selected Rank:{" "}
          {selectedRank.name
            ? selectedRank.name.charAt(0).toUpperCase() +
              selectedRank.name.substring(1)
            : "None"}
        </p>
        <div>
          {/* temp button onlick func */}
          <button
            onClick={() => {
              if (videoData[currentVideo.id - 1]) {
                setCurrentVideo(videoData[currentVideo.id - 1]);
              }
            }}
          >
            Previous Clip
          </button>
          <button>Submit</button>
          <button
            onClick={() => {
              if (videoData[currentVideo.id + 1]) {
                setCurrentVideo(videoData[currentVideo.id + 1]);
              }
            }}
          >
            Next Clip
          </button>
        </div>
      </div>
    </>
  );
}

export default Games;
export { loader };
