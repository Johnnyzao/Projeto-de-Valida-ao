import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, json, useNavigate } from "react-router-dom";

const MEditar = () => {

    const { mid } = useParams();
    const navigate=useNavigate();

    //Retirado do CriarM
    const[id,idchange]=useState("");
    const[rua,ruachange]=useState("");
    const[codigopostal,codigopostalchange]=useState("");
    const[numero,numerochange]=useState("");
    const[porta,portachange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,validationchange]=useState(false);

    const handlesubmit = (e) => {
        e.preventDefault();

        const chaveDeAcesso = 'testechave';

        const mdata = { rua, numero, porta, codigopostal, active };

        fetch(`http://localhost:8000/morada/${mid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            // Access Key
            "Authorization": `Bearer ${chaveDeAcesso}`,
            body: JSON.stringify(mdata)
        })
        .then((res) => {
            if (res.ok) {
                alert('Saved successfully.');
                navigate('/');
            } else {
                alert('Erro ao salvar: ' + res.statusText);
            }
        })
        .catch((err) => {
            console.log(err.message);
            alert('Erro ao salvar: ' + err.message);
        });
    };
    //
    const [mdata, mdatachange] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8000/morada/" + mid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            ruachange(resp.rua);
            codigopostalchange(resp.codigopostal);
            numerochange(resp.numero);
            portachange(resp.porta);
            activechange(resp.active);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Editar Morada</h2>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Rua</label>
                                            <input required value={rua} onMouseDown={e=>validationchange(true)} onChange={e=>ruachange(e.target.value)} className="form-control"></input>
                                            {rua.length==0 && validation && <span className="text-danger">Colocar o nome</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Número</label>
                                            <input required value={numero} onChange={e=>numerochange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Porta</label>
                                            <input value={porta} onChange={e=>portachange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Código Postal</label>
                                            <input required value={codigopostal} onChange={e=>codigopostalchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-check">
                                        <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label className="form-check-label">Is Active</label>                                       
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default MEditar;