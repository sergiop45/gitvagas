import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Rotas  from './Routes';
import { useVaga } from './contexts/contextVaga';
import { useEffect } from 'react';

function App() {

  const {searchVagas, vagas} = useVaga();

  useEffect(() => {
    searchVagas()

  }, []);


  return (
    <div className="App">

      <Rotas />
      
    </div>
  );
}

export default App;
