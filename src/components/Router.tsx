import Indice from "./Indice";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import InsertarGato from "./InsertarGato";
import ListarGatos from "./ListarGatos";
import ModificarGato from "./ModificarGato";

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Indice />}></Route>
                <Route path="/anadir" element={<InsertarGato />}></Route>
                <Route path="/modificar" element={<ModificarGato/>}></Route>
                <Route path="/listar" element={<ListarGatos/>}></Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default Router;