import { useRouteError } from "react-router-dom";
function Error() {
  const error = useRouteError();
  console.log(error);
  return <div>{error.message}, Please refresh the page</div>;
}

export default Error;
