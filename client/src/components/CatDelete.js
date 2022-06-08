import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CatDelete = ({deleteHandler}) => {
    const location = useLocation();
    const cat = location.state.cat;
    //console.log('location: ',location);
    const [name, setName] = useState(cat.name);
    const [choose,setChoose] = useState(false);
    const navigate = useNavigate();

    const formHandler = (e) => {
        e.preventDefault();
        if(choose){
            deleteHandler(cat);
        }

        navigate('/cats');
        
    }

    return (
        <form onSubmit={formHandler}>
            <label>Are you sure you want to delete {cat.name} ?</label>
            <button onclick={()=>{setChoose(true)}}>Yes</button>
            <button >No</button>
        </form>
    );
        
}

export default CatDelete;