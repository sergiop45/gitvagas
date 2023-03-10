import React from 'react';
import Logo from '../../assets/img/default_transparent_765x625.png'
import './header.css';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

const Header = () => {

  const [ btnMenu, setBtnMenu ] = useState(false);

  return (
    <header>

        <Link to='/' className='logo'>
          <img src={Logo} alt="logotipo"  className='logo-img'/>
          </Link>

        <h2 className='title'>Vagas de emprego em Curitiba e Região</h2>

        <div className='links'>

            <Link to='/'>Home</Link>
            <Link to='/cadastrar'>Cadastrar</Link>
            <Link to='/calculo'>Calculo Recisão</Link>
            <Link to='/sobre'>Sobre</Link>

        </div>

        <div className='menu'>
          <AiOutlineMenu 
          onClick={() => {
            setBtnMenu(!btnMenu);
            setTimeout(() => {
              setBtnMenu(false)
            }, 5000);
          }}
          />
        </div>

        { btnMenu && (
          <div className='links-mobile'>

          <Link to='/'>Home</Link>
          <Link to='/cadastrar'>Cadastrar</Link>
          <Link to='/calculo'>Calculo Recisão</Link>
          <Link to='/sobre'>Sobre</Link>

        </div>
        )}
        

    </header>
  )
}

export default Header;