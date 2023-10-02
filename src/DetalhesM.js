import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, json, useNavigate } from "react-router-dom";

const MDetalhes = () => {
    const { mid } = useParams();

    const [mdata, mdatachange] = useState(null);


    useEffect(() => {
        const chaveDeAcesso = 'testechave';

        fetch(`http://localhost:8000/morada/${mid}`, {
            headers: {
                // Access Key
                "Authorization": `Bearer ${chaveDeAcesso}`
            }
        })
            .then((res) => res.json())
            .then((resp) => {
                mdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [mid]);

    return (
        <div className="card" style={{ "textAlign": "left" }}>
            <div className="card-title">
                <h2>Editar Morada</h2>
            </div>
            {mdata &&
                <div>
                    <h2>A morada é: <b>{mdata.rua}</b> ({mdata.id})</h2>
                    <h3>Detalhes</h3>
                    <h5>Numero é: {mdata.numero}</h5>
                    <h5>Porta é: {mdata.porta}</h5>
                    <h5>Código Postal é: {mdata.codigopostal}</h5>
                    <Link to="/" className="btn btn-danger">Back</Link>
                </div>
            }
        </div>
    );
}

export default MDetalhes;