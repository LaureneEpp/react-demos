// Create Posts List linking to Post showpage
// Post Form
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <Link to="/">Posts List</Link>
            {" | "}
            <Link to="/new">New post</Link>
            
        </nav>
    )
}

export default NavBar;
