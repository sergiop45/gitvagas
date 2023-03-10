import { createContext, useContext, useState } from "react";
import api from '../service/api';

const vagaContext = createContext({});

export function VagaProvider({children}) {

    const [ id, setId ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fone, setFone ] = useState('');
    const [ city, setCity ] = useState('');
    
    const [ vagas, setVagas ] = useState({});
    const [ vaga, setVaga ] = useState([]);

    const [ status, setStatus ] = useState('Pesquisar...');

    async function searchVagas() {

        await api.get('/vaga')
        .then(vagas => {

            setVagas(vagas.data);

        })
        .catch(erro => {
            console.log('Erro ao carregar vagas: ' + erro);
        });

    }

    async function searchVaga(id) {

        await api.get('/vaga/' + id)
        .then(vaga => {
            setVaga(vaga.data)
        })
        .catch(erro => console.log('erro buscar vaga: ' + erro));

    }

    

    return (
        <vagaContext.Provider value={ { searchVagas, vagas, vaga, searchVaga } }>

            {children}

        </vagaContext.Provider>
    )

}

export function useVaga() {

    const context = useContext(vagaContext);
    return context;

}