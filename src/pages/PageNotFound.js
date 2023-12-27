import { Image } from "react-bootstrap";
import "../styles/PageNotFound.css";

const PageNotFound = (props) => {
  return (
    <div>
      <h3 className="page_title">{props.message}</h3>
      <Image
        className="img_not_found rounded"
        src="/Images/Backgrounds/notFound.jpg"
      ></Image>
    </div>
  );
};

export default PageNotFound;
