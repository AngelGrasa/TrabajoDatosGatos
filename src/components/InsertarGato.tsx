import { text } from "node:stream/consumers";
import { useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import VolverIndice from "./VolverIndice";
import { wait } from "@testing-library/user-event/dist/utils";
import { Alert, Button, Form, Image } from "react-bootstrap";

const url = "https://dszwigxfcukiuhotwjuy.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzendpZ3hmY3VraXVob3R3anV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ3ODg1MDMsImV4cCI6MTk3MDM2NDUwM30.SL0mV8x_yTNDvaCZAcxfKcQDIsMYWRWVIi5YWXDsPas"
const InsertarGato = () => {
    const [showAlert, setShowAlert] = useState(false)
    const [raza, setRaza] = useState("")
    const [nombre, setNombre] = useState("")
    const [anillado, setAnillado] = useState("")
    const [edad, setEdad] = useState(0)
    const baseDatos = createClient(url, key)

    const submit = async (e: any) => {
        e.preventDefault()
        if (raza.trim() !== "" && nombre.trim() !== "" && anillado.trim() !== "" && edad.toString().trim() !== "0") {

            await baseDatos.from("Gatitos").insert({ raza: raza, nombre: nombre, anillado: anillado, edad: edad })
            wait(200).then(() => {
                setRaza("")
                setAnillado("")
                setNombre("")
                setEdad(0)

            }

            )

        } else {

            setShowAlert(true)
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Alert  variant="success" show={showAlert} style={{ justifyContent:"center", display:"flex", position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", flexDirection:"column" , alignItems:"center" }}>
                <Alert.Heading>Faltan campos por completar</Alert.Heading>
                <Image src="https://3.bp.blogspot.com/-kIfFpt74bM4/UXnd5EMbrXI/AAAAAAAAJUM/4h5z7DVYOjE/s1600/ADAPTACION.jpg"/>
                
                <Button onClick={() => { setShowAlert(false) }}>OK</Button>
            </Alert>
            <Form onSubmit={submit} style={{ maxWidth: "20em", transform: "translate(0%, 50%)" }} >
                <Form.Group>
                    <Form.Label>Raza</Form.Label>
                    <Form.Control type="text" placeholder="Raza" value={raza} onChange={(e) => { setRaza(e.target.value) }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Anillado</Form.Label>
                    <Form.Control type="text" placeholder="Anillado" value={anillado} onChange={(e) => { setAnillado(e.target.value) }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="text" placeholder="Edad" value={edad} onChange={(e) => { setEdad(Number(e.target.value)) }} />
                </Form.Group>


                <Button type="submit" style={{ marginTop:"10px"}} variant="success">Añadir Gato</Button>{' '}
                <p />
                <VolverIndice />
            </Form>
        </div>
    )
}
export default InsertarGato;