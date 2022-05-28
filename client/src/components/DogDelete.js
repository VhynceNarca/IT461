import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DogDelete = ({deleteHandler}) => {
    const location = useLocation();
    const dog = location.state.dog;
    //console.log('location: ',location);
    const [name, setName] = useState(dog.name);
    const [choose,setChoose] = useState(false);
    const navigate = useNavigate();

    const formHandler = (e) => {
        e.preventDefault();
        if(choose){
            deleteHandler(dog);
        }

        navigate('/dogs');
        
    }

    return (
        <form onSubmit={formHandler}>
            <label>Are you sure you want to delete {dog.name} ?</label>
            <button onclick={()=>{setChoose(true)}}>Yes</button>
            <button >No</button>
        </form>
    );
        
}

export default DogDelete;