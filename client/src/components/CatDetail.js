import {Link, useLocation} from "react-router-dom";

const CatDetail = ({cat}) => {
    const location = useLocation();
    const cat = location.state.cat;
    //console.log('location: ',location);

    return (
        <div>
            <h1>Cat Detail</h1>
            <div>
                ID: : {cat.id}
            </div>
            <div>
                NAME: : {cat.name}
            </div>
            <div>
                <Link to ="/cats" >Back to Cats List</Link>
            </div>
        </div>
        
    );
}

export default CatDetail;