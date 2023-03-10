import React from 'react';
import './footer.css';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>

        <Link className='btn-calculo' to='/calculo'>Calculo de recisão</Link>

        <h4>Copyright © 2023 Curivagas. Todos os direitos reservados.</h4>
        
        <div className='redes'>
          <a href='www.facebook.com'><BsFacebook/></a>
          <a href='www.instagram.com.br'><BsInstagram/></a>
          <a href='www.linkedin.com'><AiFillLinkedin/></a>
        </div>
    
    </footer>
  )
}

export default Footer;