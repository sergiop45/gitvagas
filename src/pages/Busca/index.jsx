import React, { useEffect, useState } from 'react';
import './busca.css';
import { useVaga } from '../../contexts/contextVaga';
import Card from '../../components/Card';
import Search from '../../components/Search';
import { useSearchParams } from 'react-router-dom';


const Busca = () => {
    
    const { vagas, searchVagas } = useVaga();
    const [ searchParams ] = useSearchParams();
    const query = searchParams.get('q');
    const [ result, setResult ] = useState(vagas)


    function filterVagas() {

        const res = vagas.filter(vaga => vaga.title.toLowerCase().includes(query));
        setResult(res);

    }

    useEffect(() => {

        searchVagas();
        filterVagas();
        
    }, [query])

  return (
    <div className='home-page'>

        <Search />

        <main className='feed-vagas'>

            { result.length > 0 ? 
                result.map(vaga => {
                    return(
                    <Card key={vaga._id}
                          title={vaga.title}
                          description={vaga.description}
                          id={vaga._id}
                    />
                    )

                })
            : <h1>Nenhum resultado encontrado...</h1> }

        </main>

    </div>
  )
}

export default Busca;