import { Link } from 'react-router-dom';

const CatCard = ({cat}) => {
    return (
        <tr key={cat.id}>
            <td>{cat.id}</td>
            <td>{cat.name}</td>
            <td>
                <Link to={`/dogs/view/${cat.id}`} state={{cat}}> View </Link> |
                <Link to={`/dogs/edit/${cat.id}`} state={{cat}}> Edit </Link> |
                <Link to={`/dogs/delete/${cat.id}`} state={{cat}}> Delete </Link>
            </td>
        </tr>
    );
}