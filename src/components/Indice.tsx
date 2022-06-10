import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Indice = () => {
    return (
        <div style={{ justifyContent:"center", display:"flex", position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", flexDirection:"column" , alignItems:"center" }} >
            <p style={{ fontSize: "4em" }}> Índice</p>
            <Link  to="/anadir"><Button style={{ marginBottom:"10px"}} variant="primary">Añadir Gato</Button>{' '}</Link>
            
            <Link to="/listar"><Button variant="info">Listar Gatos</Button>{' '}</Link>     

        </div>
    )
}
export default Indice;