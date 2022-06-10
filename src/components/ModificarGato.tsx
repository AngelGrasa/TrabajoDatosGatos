import { createClient } from "@supabase/supabase-js"
import { wait } from "@testing-library/user-event/dist/utils"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import Gato from "../models/Gato"
import VolverIndice from "./VolverIndice"

const ModificarGato = () => {

    const url = "https://dszwigxfcukiuhotwjuy.supabase.co"
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzendpZ3hmY3VraXVob3R3anV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ3ODg1MDMsImV4cCI6MTk3MDM2NDUwM30.SL0mV8x_yTNDvaCZAcxfKcQDIsMYWRWVIi5YWXDsPas"
    
        const [raza, setRaza] = useState("")
        const [nombre, setNombre] = useState("")
        const [anillado, setAnillado] = useState("")
        const [edad, setEdad] = useState(0)
        const baseDatos = createClient(url, key)
        const parametros = new URLSearchParams(window.location.search)
        const submit = async (e: any) => {
            e.preventDefault()
            if (raza.trim() !== "" && nombre.trim() !== "" && anillado.trim() !== "" && edad.toString().trim() !== "0") {

                await baseDatos.from("Gatitos").update({ raza: raza, nombre: nombre, anillado: anillado, edad: edad }).eq('id', parametros.get("id"))
            } else {
                alert('Faltan campos por completar')
            }
        }
        const cargarGato = async () => {
            let { data, error } = await baseDatos
                .from<Gato>('Gatitos')
                .select('*').eq('id', parametros.get("id") || "").single() 
            
            wait(1000).then(() => {
                setRaza(data?.raza || "")
                setNombre(data?.nombre || "")
                setAnillado(data?.anillado || "")
                setEdad(data?.edad || 0)
                
            })
    
        }

        useEffect(() => {
            cargarGato()
        }, [])
        return (
            
            <Form onSubmit={submit} style={{ justifyContent:"center", display:"flex", position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", flexDirection:"column" , alignItems:"center" }}>
                <Form.Group>
                    <Form.Label>Raza</Form.Label>
                    <Form.Control type="text" placeholder="Raza" value={raza} onChange={(e) => { setRaza(e.target.value) }} />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Raza</Form.Label>
                    <Form.Control type="text" placeholder="Anillado" value={anillado} onChange={(e) => { setAnillado(e.target.value) }} />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Raza</Form.Label>
                    <Form.Control type="text" placeholder="Edad" value={edad} onChange={(e) => { setEdad(Number(e.target.value)) }} />
                </Form.Group>
                
                <Button type="submit" style={{ marginTop:"10px"}} variant="dark">Modificar Gato</Button>{' '}
                
                <VolverIndice />
            </Form>
        )

    }
    export default ModificarGato;