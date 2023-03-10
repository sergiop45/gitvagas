import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Vaga from './pages/Vaga';
import Header from './components/Header';
import Cadastrar from './pages/Cadastrar';
import Sobre from './pages/Sobre';
import Busca from './pages/Busca';
import Calculo from './pages/Calculo';
import Footer from './components/Footer';


export default function Rotas() {
    return(
        <BrowserRouter>

            <Header />

            <Routes>
            
            <Route element={<Home />} path='/' />
            <Route element={<Vaga/>} path='/vaga/:id' />
            <Route element={<Cadastrar />} path='/cadastrar' />
            <Route element={<Sobre/>} path='/sobre' />
            <Route element={<Busca />} path='/busca' />
            <Route element={<Calculo/>} path='/calculo' />
            <Route element={<Home />} path='*' />

            </Routes>

            <Footer/>

        </BrowserRouter>
    );
}