import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const ListagemM = ({ selectedLocation }) => {
    const [mdata, mdatachange] = useState(null);
    const navigate = useNavigate();

    const CDetalhes = (id) => {
        navigate("/morada/detalhes/" + id)
    }
    const CEditar = (id) => {
        navigate("/morada/editar/" + id)
    }
    const CRemover = (id) => {
        if (window.confirm('Pretende remover?')) {
            const chaveDeAcesso = ' '; 

            fetch(`http://localhost:8000/morada/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${chaveDeAcesso}`
                }
            })
                .then((res) => {
                    if (res.ok) {
                        alert('Apagado com sucesso.');
                        mdatachange(prevData => prevData.filter(item => item.id !== id));
                    } else {
                        alert('Erro ao apagar: ' + res.statusText);
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                    alert('Erro ao apagar: ' + err.message);
                });
        }
    };

    useEffect(() => {
        const chaveDeAcesso = 'testechave';
        fetch("http://localhost:8000/morada", {
            headers: {
                'Authorization': `Bearer ${chaveDeAcesso}`
            }
        })
            .then((res) => res.json())
            .then((resp) => {
                mdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Listagem Moradas</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/morada/criar" className="btn btn-sucess">Adicionar nova +</Link>
                    </div>
                    <table className="table tablet-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Rua</td>
                                <td>Número</td>
                                <td>Porta</td>
                                <td>Código postal</td>
                            </tr>
                        </thead>
                        <tbody>
                            {mdata && mdata.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.rua}</td>
                                        <td>{item.numero}</td>
                                        <td>{item.porta}</td>
                                        <td>{item.codigopostal}</td>
                                        <td>
                                            <a onClick={() => { CEditar(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { CRemover(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { CDetalhes(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                );
                            })}

                            {selectedLocation && (
                                <div>
                                    <h3>Selected Location:</h3>
                                    <p>Latitude: {selectedLocation.lat}</p>
                                    <p>Longitude: {selectedLocation.lng}</p>
                                </div>
                            )}
                    </tbody>

                </table>
            </div>
        </div>
        </div >
    );
};

export default ListagemM;
