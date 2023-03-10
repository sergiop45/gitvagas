import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './search.css';

const Search = () => {

  const [ search, setSearch ] = useState('');
  const navigate = useNavigate();
  const [ filterDays, setFilterDays ] = useState('hoje');
  const [ filterCitys, setFilterCitys ] = useState('todas');

  async function searchVagas(e) {
    e.preventDefault();
    
    if(!search) return

    navigate("/busca?q="+search);
    setSearch('');
  }


  return (
    <form onSubmit={searchVagas} className='form-search'>
        
        <div className='search'>
          <h2>Buscar Vagas:</h2>
          <input type="text" 
          onChange={e => setSearch(e.target.value)}
          value={search}
          />
          <button><BiSearch/></button>
        </div>

        <div className='filters'>
            
            <div className='item-form'>
                  <label >Cidade:</label>
                  <select name="city" id="" onChange={(e) => setFilterCitys(e.target.value)}>
                      
                      <option value="curitiba">Curitiba</option>
                      <option value="campina grande do sul">Campina grande do sul</option>
                      <option value="colombo">Colombo</option>
                      <option value="quatro barras">Quatro barras</option>
                      <option value="araucaria">Araucaria</option>
                      <option value="piraquara">Piraquara</option>
                      <option value="são josé dos pinhais">São josé dos pinhais</option>
                      
                  </select>
              </div>

              <div className='item-form'>
                  <label >Postada:</label>
                  <select name="city" id="" onChange={(e) => setFilterDays(e.target.value)}>
                      
                      <option value="hoje">Hoje</option>
                      <option value="3 dias">Até 3 dias</option>
                      <option value="7 dias">Até 7 dias  </option>
                      <option value="14 dias">Até 14 dias  </option>
                      
                  </select>
              </div>  
        </div>
    </form>
  )
}

export default Search;