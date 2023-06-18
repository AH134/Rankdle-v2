import { useLoaderData } from "react-router-dom";

const loader = ({ params }) => {
  const games = ["lol", "valorant"];

  if (!games.includes(params.name)) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return params.name;
};

const Game = () => {
  const game = useLoaderData();

  return <div>this page is for {game}</div>;
};

export default Game;
export { loader };
