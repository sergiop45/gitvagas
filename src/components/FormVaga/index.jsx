import React from 'react';
import './formvaga.css';
import { useState } from 'react';


const FormVaga = () => {

const [ title, setTitle ] = useState('');
const [ description, setDescription ] = useState('');
const [ fone, setFone ] = useState('');
const [ email, setEmail ] = useState('');
const [ city, setCity ] = useState('curitiba');
const [ cadastro, setCadastro ] = useState(false);
const [ response, setResponse ] = useState(false);
const [ erro, setErro ] = useState('');

async function cadastrar(e) {
    e.preventDefault();
    const data = {
        title: title,
        description: description,
        fone: fone,
        email: email,
        city: city,
    }
    
    await fetch('http://localhost:4000/api/vaga',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': "application/json; charset=UTF-8"}
    }).then(res => setResponse(true))
    .catch(err => {
        setResponse(false);
        setErro(err);
    });

    setTitle('');
    setDescription('');
    setFone('');
    setEmail('');
    setCadastro(true)
}

const Message = ({response}) => {
    return(
        <div className='message'>

            <div className='title-message'>
                <h4>Message</h4>
                <button onClick={() => setCadastro(false)}>X</button>
            </div>

            <div className='response-message'>
                <p>{response ? 
                'Sua vaga foi enviada para analise, após analise será postada.'
                : 'Erro ao cadastrar vaga! tente novamente.'}</p>
            </div>

            

        </div>
    )
}

  return (  
        <form onSubmit={cadastrar} className='formvaga'>

            { cadastro ? <Message response={response}/> : null }

            <h2>Cadastrar Vaga</h2>

            <div className='item-form'>
                <label >Titulo:</label>
                <input type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                 />
            </div>

            <div className='item-form description'>
                <label >Descrição:</label>
                
                <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div>

            <h4>Contatos:</h4>

            <div className='item-form'>
                <label >Telefone:</label>
                <input type="text"
                value={fone}
                onChange={e => setFone(e.target.value)}
                />
            </div>

            <div className='item-form'>
                <label >Email:</label>
                <input type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className='item-form'>
                <label >Cidade:</label>
                <select name="city" id="" onChange={e => setCity(e.target.value)}>
                    
                    <option value="curitiba">Curitiba</option>
                    <option value="campina grande do sul">Campina grande do sul</option>
                    <option value="colombo">Colombo</option>
                    <option value="quatro barras">Quatro barras</option>
                    <option value="araucaria">Araucaria</option>
                    <option value="piraquara">Piraquara</option>
                    <option value="são josé dos pinhais">São josé dos pinhais</option>
                    
                </select>
            </div>

            <button className='btn'>Cadastrar</button>

        </form>
  )
}

export default FormVaga