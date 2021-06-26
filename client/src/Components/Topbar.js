import { Link } from "react-router-dom";
import "./topbar.css";

const Topbar = () => {
    return (
        <div className="top">
            <div className="topLeft">
                <li className="topListItem">
                    <Link className="link" to="/">
                        Spis
                    </Link>
                </li>
            </div>
            <div className="topCenter">
                <ul className="topList">


                </ul>
            </div>
            <div className="topRight">
                <li className="topListItem">
                    <Link className="link" to="/">
                        Log in
                    </Link>
                </li>
            </div>
        </div>
    );
}

export default Topbar;
