import { useRouteError } from "react-router-dom";
function Error() {
  const error = useRouteError();
  return <div>{error.data}</div>;
}

export default Error;
