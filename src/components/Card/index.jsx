import React, { useEffect, useState } from 'react';
import './card.css';
import { Link } from 'react-router-dom';

const Card = ({title, description, fone, email, city, created, id }) => {

  const [ status, setStatus ] = useState('card');
  const [ postado, setPostado ] = useState();

  useEffect(() => {
    
    if(fone) {
        setStatus('card-complet');
        const data1 = new Date(created);
    
        const data2 = new Date();
    
        // Calcule a diferença em milissegundos entre as duas datas
        const diferencaEmMilissegundos = Math.abs(data2 - data1);

        // Converta a diferença em dias dividindo pelo número de milissegundos em um dia
        const diasPostado = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
        setPostado(diasPostado);
       

        
    } else {
      setStatus('card');

      const data1 = new Date(created);
    
        const data2 = new Date();
      
        // Calcule a diferença em milissegundos entre as duas datas
        const diferencaEmMilissegundos = Math.abs(data2 - data1);

        // Converta a diferença em dias dividindo pelo número de milissegundos em um dia
        const diasPostado = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
        setPostado(diasPostado);
        

    }
    
    
  }, [fone]);

  

  


  return (
    <div className={status}>

        <h2 className='title-card'>{title}</h2>
        <p className='description'>{description}</p>
        <p className='city'>Cidade: {city}</p>
        <p className='city'>Postada: {'a ' + postado + ' dias'}</p>
        {fone ? 
              (
                <div className='contatos'>
                  <h4>Contatos:</h4>
                  <p>Telefone: {fone}</p>
                  <p>Email: {email}</p>
                  <p>Cidade: {city}</p>
                  <p>Postada: {'a ' + postado + ' dias'}</p> 
                </div>
              )
              : <Link to={'/vaga/'+id} className='btn-vermais'>Ver Mais</Link> 
         }

       

    </div>
  )
}

export default Card