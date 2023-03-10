import React, { useEffect, useState } from 'react';
import './calculo.css';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Calculo = () => {

    const [ salario, setSalario ] = useState(0);
    const [ data_admi, setData_admi ] = useState(new Date());
    const [ data_demissao, setData_demissao ] = useState(new Date());
    const [ motivo, setMotivo ] = useState('dispensa sem justa causa');
    const [ avisoPrevio, setAvisoPrevio ] = useState('idenizado pelo empregador');
    const [ feriasVenc, setFeriasVenc ] = useState(false);
    const [ valorAvisoPrevio, setValorAvisoPrevio ] = useState(0);
    const [ salarioProporcional, setSalarioProporcional ] = useState(0);
    const [ valorFerias, setValorFerias ] = useState(0);
    const [ tercoFerias, setTercoFerias ] = useState(0);
    const [ valor13o, setValor13o ] = useState(0);
    const [ decimoIden, setDecimoIden ] = useState(0);
    const [ feriasIden, setFeriasIden ] = useState(0);
    const [ INSS, setINSS ] = useState(0);
    const [ INSSdecimo, setINSSdecimo ] = useState(0);
    const [ fgts, setFgts ] = useState(0);
    const [ valorMultaFGTS, setValorMultaFGTS ] = useState(0);
    const [ recisao, setRecisao ] = useState(0);
    const [ showResult, setShowResult ] = useState(false);
    

    function primeiroCalculo() {
        const data1 = new Date(data_admi);
        const data2 = new Date(data_demissao);

        // Calcule a diferença em milissegundos entre as duas datas
        const diferencaEmMilissegundos = Math.abs(data2 - data1);

        // Converta a diferença em dias dividindo pelo número de milissegundos em um dia
        const diasTrabalhados = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));


        // Cálculo do valor da rescisão
        const diasTrabalhadosMes = parseInt(data_demissao.substring(8,10)); 
        setSalarioProporcional((salario/30)*diasTrabalhadosMes);
        setValorFerias((salario / 12) * (diasTrabalhados / 30));
        setTercoFerias(((salario / 12) * (diasTrabalhados / 30)/3));
        setValor13o((salario / 12) * (diasTrabalhados / 30));
        setDecimoIden(salario/12);
        setFgts((salario * 0.09) * (diasTrabalhados / 30));
        setFeriasIden(salario/12);
        setValorAvisoPrevio(() => {
            if(avisoPrevio === 'idenizado pelo empregador'){
                return salario;
            } else if(avisoPrevio === 'nao cumprido pelo empregado'){
                return -salario;
            } else if(avisoPrevio === 'trabalhado'){
                return 0;
            }
        })
        setINSS(((salario/30)*diasTrabalhadosMes) * 0.081);
        
        setValorMultaFGTS(((salario * 0.09) * (diasTrabalhados / 30)) * 0.4);
        
        setINSSdecimo(() => ((salario/12) + (salario / 12) * (diasTrabalhados / 30)) * 0.075);

        
    }

    useEffect(() => {
        calcularRecisao()
    }, [tercoFerias, valorAvisoPrevio, salarioProporcional, data_admi, data_demissao])

    function calcularRecisao() {


        if(motivo === 'dispensa sem justa causa') {
            
            // Resultado do cálculo
                      
            setRecisao((salarioProporcional + feriasIden + valorFerias + valor13o + decimoIden + tercoFerias + valorAvisoPrevio - (INSS + INSSdecimo)));
            
        } else 
        if (motivo === 'dispensa com justa causa') {

            setValorFerias(() => {
                if(!feriasVenc) {
                    return 0;
                }
            });
            setTercoFerias(0.00);
            setFeriasIden(0.00);
            setValorAvisoPrevio(0.00);
            setValor13o(0.00);
            setDecimoIden(0.00);
            setINSSdecimo(0.00);

             // Resultado do cálculo
             const calculoRecisao = salarioProporcional + feriasIden + valorFerias + valor13o + decimoIden+ tercoFerias + valorAvisoPrevio - INSS - INSSdecimo;
             setRecisao(calculoRecisao);

        }else 
        if (motivo === 'termino contrato') {

            
            setFeriasIden(0.00);
            setValorAvisoPrevio(0.00);
            setDecimoIden(0.00);

             // Resultado do cálculo
             const calculoRecisao = salarioProporcional + feriasIden + valorFerias + valor13o + decimoIden+ tercoFerias + valorAvisoPrevio - INSS - INSSdecimo;
             setRecisao(calculoRecisao);

        } else 
        if(motivo === 'pedido de demissao') {
            
            if(avisoPrevio === 'trabalhado') {

                setFeriasIden(0.00);
                setValorAvisoPrevio(0.00);
                setDecimoIden(0.00);
                const totalFerias = feriasIden + valorFerias + tercoFerias;
                const totalDecimo = +  valor13o + decimoIden;
                const totalDesconto = INSS + INSSdecimo

                const calculoRecisao = salarioProporcional  + valorAvisoPrevio + totalFerias + totalDecimo - totalDesconto;
                setRecisao(calculoRecisao);
                
            } else if (avisoPrevio === 'nao cumprido pelo empregado'){
                
                setFeriasIden(0.00);
                setValorAvisoPrevio(-salario);
                setDecimoIden(0.00);
                
                

                const calculoRecisao = salarioProporcional + feriasIden + valorFerias + valor13o + decimoIden+ tercoFerias + valorAvisoPrevio - INSS - INSSdecimo;
                setRecisao(calculoRecisao)
                  
                
                
            
            }
        }

        setMotivo('dispensa sem justa causa');

    }


  return (
    <div className='calculo'>
        { showResult ? null : (
        <div className='calculadora'>
            
            <h2>Calculo de Rescisão de contrato de trabalho - CLT</h2>

            <div className='inputs'>

                <div className='item-input salario'>
                    <label className='tooltiptext'>
                    Salário registrado na carteira de trabalho. Remuneração que um trabalhador recebe por mês, sem considerar os descontos oficiais obrigatórios.
                    </label>
                    <label className='item-title'>Salario Bruto <AiOutlineInfoCircle/></label>
                    <label>R$<input type="text" required 
                                    inputMode='number' 
                                    onChange={(e) => setSalario(parseFloat(e.target.value))}/>
                    </label>
                </div>

                <div className='item-input'>
                    <label className='tooltiptext'>
                    Salário registrado na carteira de trabalho. Remuneração que um trabalhador recebe por mês, sem considerar os descontos oficiais obrigatórios.
                    </label>
                    <label className='item-title'>Data de Admissão <AiOutlineInfoCircle/></label>
                    <label><input type="date" 
                                    required
                                    className='input-data'
                                    onChange={(e) => setData_admi(e.target.value)}
                                    /></label>
                </div>

                <div className='item-input'>
                    <label className='tooltiptext'>
                    Salário registrado na carteira de trabalho. Remuneração que um trabalhador recebe por mês, sem considerar os descontos oficiais obrigatórios.
                    </label>
                    <label className='item-title'>Data de Demissão <AiOutlineInfoCircle/></label>
                    <label><input type="date" 
                                    required
                                    className='input-data'
                                    onChange={(e) => setData_demissao(e.target.value)} /></label>
                </div>

                <div className='item-input'>
                    <label className='tooltiptext'>
                    Salário registrado na carteira de trabalho. Remuneração que um trabalhador recebe por mês, sem considerar os descontos oficiais obrigatórios.
                    </label>
                    <label className='item-title'>Motivo <AiOutlineInfoCircle/></label>
                    <select name="" id="" onChange={(e) => setMotivo(e.target.value)}>
                        <option value="dispensa sem justa causa">Dispensa sem justa causa</option>
                        <option value="dispensa com justa causa">Dispensa com justa causa</option>
                        <option value="pedido de demissao">Pedido de demissão</option>
                        <option value="termino contrato">Termino Contrato de Experiência</option>
                    </select>
                </div>

                { motivo !== 'termino contrato'   && motivo !== 'dispensa com justa causa' ? (
                    <div className='item-input'>
                        <label className='tooltiptext'>
                        Salário registrado na carteira de trabalho. Remuneração que um trabalhador recebe por mês, sem considerar os descontos oficiais obrigatórios.
                        </label>
                        <label className='item-title'>Aviso prévio <AiOutlineInfoCircle/></label>
                            <select name="" id="" onChange={(e) => setAvisoPrevio(e.target.value)}>
                        
                                <option value="idenizado pelo empregador">Idenizado pelo empregador</option>
                                <option value="trabalhado">Trabalhado</option>
                                <option value="nao cumprido pelo empregado">Não cumprido pelo empregado</option>
        
                            </select>
                    </div>
                ): null}
                

                <div className='item-input'>
                    <label>Possui férias vencidas? </label>
                    
                    <div className='options-holiday'>
                        <input type="radio" 
                               name="has_holiday" 
                               onChange={() => setFeriasVenc(true)} />
                        <label htmlFor="has_holiday_yes">Sim</label>
                        <input type="radio" name="has_holiday" onChange={() => setFeriasVenc(false)} />
                        <label htmlFor="has_holidy_no">Não</label>
                    </div>
                    
                </div>

            </div>

            <div className='content-btn'>
                <button 
                className='btn-clean'
                >
                    Limpar
                </button>
                <button 
                className='btn-calcular'
                onClick={() => {
                    primeiroCalculo()
                    setShowResult(true)
                    }}
                >
                    Calcular
                </button>
            </div>

        </div> 
        )}

        { showResult ? ( 
            <div className='resultado'>

            <div className='item-resultado'>
                <label>Saldo de Salario: R$ {salarioProporcional.toFixed(2)}</label>
            </div>

            <div className='item-resultado'>
                <label>Aviso Prévio: R$ {valorAvisoPrevio.toFixed(2)}</label>
            </div>

            <div className='item-resultado'>
                <label>Ferias Proporcionais: R$ {valorFerias.toFixed(2)}</label>
            </div>

            <div className='item-resultado'>
                <label>1/3 Ferias : R$ {tercoFerias.toFixed(2)}</label>
            </div>

            <div className='item-resultado'>
                <label>Ferias idenizada 1/12: R$ {feriasIden.toFixed(2)}</label>
            </div>

            <div className='item-resultado'>
                <label>Decimo terceiro Proporcional: R$ {valor13o.toFixed(2)}</label>
            </div>

            <div className='item-resultado'>
                <label>Decimo Terceiro idenizado : R$ {decimoIden.toFixed(2)}</label>
            </div>

            <div className='descontos'>
                <p>Descontos:</p>
                <label>INSS salario : - R$ {INSS.toFixed(2)}</label>
                <label>iNSS decimo terceiro : - R$ {INSSdecimo.toFixed(2)}</label>
            </div>

            <div className='item-resultado recisao'>
                <label>Recisão: R$ {recisao.toFixed(2)}</label>
            </div>

            <div className='fgts'>
                <p>FGTS:</p>
                <label>Fgts: R$ {fgts.toFixed(2)}</label>
                <label>Multa Fgts: R$ {valorMultaFGTS.toFixed(2)}</label>
                <label>Total Fgts: R$ {(fgts + valorMultaFGTS).toFixed(2)}</label>
            </div>

            <button onClick={() => setShowResult(false)}>Voltar a calculadora</button>

        </div>
        
        ): null }

       

    </div>
  )
}

export default Calculo