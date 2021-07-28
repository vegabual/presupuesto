import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {
  //definir el state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [totalGastos, guardarTotalGastos] = useState(0);
  const [mostrarpregunta, actualizarPregunta]=useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [crearGasto, guardarCrearGasto] = useState(false);

  //useEffect que actualiza el restante
  useEffect(() => {

    if(crearGasto){
      //Agrega nuevo presupuesto
      guardarGastos([
        ...gastos,
        gasto
      ]);

      //resta al presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      //suna al total gastos
      const sumaGastos = totalGastos + gasto.cantidad;
      guardarTotalGastos(sumaGastos);

      //resetear a false
      guardarCrearGasto(false);
    }
  }, [gasto, crearGasto, gastos, restante, totalGastos])

  return (
    <div className="container">
      <header>
        <h1>Gasto semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarpregunta ? (
            <Pregunta
              guardarPresupuesto = {guardarPresupuesto}
              guardarRestante = {guardarRestante}
              actualizarPregunta = {actualizarPregunta}
            />
          ) : 
          (
            <div className='row'>
              <div className='one-half column'>
                <Formulario
                  guardarGasto = {guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                  restante = {restante}
                />
              </div>
              <div className='one-half column'>
                <Listado 
                  gastos = {gastos}
                />
                <ControlPresupuesto
                    presupuesto = {presupuesto}
                    restante = {restante}
                    totalGastos = {totalGastos}
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
