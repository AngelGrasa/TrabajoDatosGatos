import { useEffect, useState } from "react";
import Gato from "../models/Gato";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { wait } from "@testing-library/user-event/dist/utils";
import { Link } from "react-router-dom";
import VolverIndice from "./VolverIndice";
import { Table } from "react-bootstrap";



const url = "https://dszwigxfcukiuhotwjuy.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzendpZ3hmY3VraXVob3R3anV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ3ODg1MDMsImV4cCI6MTk3MDM2NDUwM30.SL0mV8x_yTNDvaCZAcxfKcQDIsMYWRWVIi5YWXDsPas"



const ListarGatos = () => {

    const [ListarGatitos, setListarGatitos] = useState<Gato[]>()
    const baseDatos = createClient(url, key)
    const cargarDatos = async () => {
        let { data, error } = await baseDatos
            .from<Gato>('Gatitos')
            .select('*')
        
        wait(200).then(() => {
            setListarGatitos(data || [])
        })

    }

    const eliminarGato = async (id: number) => {

        const { data, error } = await baseDatos
            .from('Gatitos')
            .delete()
            .eq('id', id)
    }
    useEffect(() => {
        cargarDatos()
    }, [])

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        
                        <th>Raza</th>
                        <th>Nombre</th>
                        <th>Anillado</th>
                        <th>Edad</th>
                        <th>Mod</th>
                        <th>Eli</th>
                    </tr>
                </thead>
                <tbody>
                    {ListarGatitos?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.raza}</td>
                                <td>{item.nombre}</td>
                                <td>{item.anillado}</td>
                                <td>{item.edad}</td>
                                <td><Link to={"/modificar?id=" + item.id}><img src="https://images-ext-1.discordapp.net/external/1QmRVxof-l8f3J4uud8X1udSKs38nsacUosDMWgyaJI/https/upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%2528the_Noun_Project_30184%2529.svg/1024px-Edit_icon_%2528the_Noun_Project_30184%2529.svg.png" height={"40em"} width={"40em"}></img></Link></td>
                                <td ><img  onClick={() => {eliminarGato(item.id); cargarDatos() }} style={{cursor:"pointer"}} src="https://images-ext-2.discordapp.net/external/pErFBeG82XPqA0ApcNo60ZT8JDYmM_MGqXDcTZoX7E0/http/cdn.onlinewebfonts.com/svg/img_216917.png?width=521&height=640" height={"40em"} width={"40em"}></img></td>
                            </tr>
                        )
                        
                    })}
                </tbody>
            </Table>
            <VolverIndice></VolverIndice>
        </>
    )
}
export default ListarGatos;