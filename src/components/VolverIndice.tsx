import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const VolverIndice = () => {
    return (
        <Link to="/indice"><Button style={{ marginTop:"10px"}} variant="danger">{' '}Volver</Button></Link>
    )
}


export default VolverIndice;