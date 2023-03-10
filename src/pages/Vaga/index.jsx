import React, { useEffect, useState } from 'react'
import Card from '../../components/Card';
import { useVaga } from '../../contexts/contextVaga';
import { useParams } from 'react-router-dom';
import './vaga.css';

const Vaga = () => {

  const [ dados, setDados ] = useState({});
  const { id } = useParams()


  const { vaga, searchVaga } = useVaga();

    useEffect(() => {
        searchVaga(id);
    }, []);   
  

  return (
    <div className='page-vaga'>

        
        { vaga && (
            <Card title={vaga.title}
              description={vaga.description}
              fone={vaga.fone}
              email={vaga.email}
              city={vaga.city}
              created={vaga.createdAt}
        />
        )  
        }
        

    </div>
  )
}

export default Vaga;