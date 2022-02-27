import '../css/CssMain.css'
import { useState, useEffect } from "react";

function ComponenteMain() {

    const [statusCheck, setStatusCheck] = useState(false)

    useEffect(() => {
        async function llamadaAPI(){
            const req = await fetch('http://localhost:5300/ledStatus/1', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'GET',
            })

            const data = await req.json()
            setStatusCheck(data.datos.status)
            console.log(data.datos)
        }
        llamadaAPI()
    }, [])

    const handleChange = e => {
        setStatusCheck(!statusCheck)

        async function putAPI(){
            const req = await fetch('http://localhost:5300/ledStatus/1', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({status: !statusCheck})
            })
            .then(function(res){ console.log(res) })
            .catch(function(res){ console.log(res) })
    
            e.preventDefault();
        }
        putAPI()
    }

    return (
        <div className='mainDiv'>
            <h1>Prueba</h1>
            <label className="switch">
                <input type="checkbox" checked={statusCheck} onChange={handleChange}/>
                <span className="slider round"/>
            </label>
            <input type="checkbox" checked={statusCheck} onChange={handleChange}/>

        </div>
    );
}

export default ComponenteMain;