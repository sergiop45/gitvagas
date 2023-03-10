import React, { useEffect, useState } from 'react';
import './home.css';
import { useVaga } from '../../contexts/contextVaga';
import Card from '../../components/Card';
import Search from '../../components/Search';
import {BsFillArrowLeftSquareFill,
        BsFillArrowRightSquareFill }
        from 'react-icons/bs';


const Home = () => {
    
    const { vagas, searchVagas } = useVaga();
    const [ pagina, setPagina ] = useState(1);
    const [ allVagas, setAllVagas ] = useState(vagas);
    const [ vagasNow, setVagasNow ] = useState([]);

    function showVagas() {
       let showVaga= [];
       const maxIndex = (pagina*5);
       const minIndex = (maxIndex-5);

       for (let i = minIndex; i < maxIndex; i++) {
        if(allVagas[i] !== undefined) {
            showVaga.push(allVagas[i]);
        }
        }
       setVagasNow(showVaga);
       
    }

    useEffect(() => {
        setAllVagas(vagas);
        showVagas();
    }, [vagas]);

    useEffect(() => {
        searchVagas();
    }, [])

    useEffect(() => {        
        showVagas()
    }, [pagina])


    

  return (
    <div className='home-page'>

        <Search />
        
         <div className='feed'>

            
            <BsFillArrowLeftSquareFill size={150} className='btn-pagination'
            onClick={() => {
                    if(pagina > 1) {
                        setPagina(pagina-1)
                    }
                    }
                }
                />
            

            <main className='feed-vagas'>

                { vagasNow.length > 0 ?            
                    
                    vagasNow.map(vaga => {
                        return(
                        <Card key={vaga._id}
                            title={vaga.title}
                            description={vaga.description.slice(0, 50) + '...'}
                            city={vaga.city}
                            id={vaga._id}
                            created={vaga.createdAt}
                        />
                        )

                    }) 
                : null }

            </main>

            

            <BsFillArrowRightSquareFill size={150} className='btn-pagination direita'
            onClick={() => {
                            if(vagasNow.length > 4) {
                                setPagina(pagina+1)
                            }
                            }}/>

            <div className='btn-mobile'>

            <BsFillArrowLeftSquareFill size={100} className='btn-pagination-mobile'
            onClick={() => {
                    if(pagina > 1) {
                        setPagina(pagina-1)
                    }
                    }
                }
                />

            <BsFillArrowRightSquareFill size={100} className='btn-pagination-mobile'
            onClick={() => {
                            if(vagasNow.length > 4) {
                                setPagina(pagina+1)
                            }
                            }}/>

            </div>

        </div>

    </div>
  )
}

export default Home