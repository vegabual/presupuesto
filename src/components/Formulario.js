import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({guardarGasto, guardarCrearGasto, restante}) => {
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState('');
    const [error, guardarError] = useState(false);
    const [mensajeError, guardarMensaje] = useState('');

    const agregarGasto = e => {
        e.preventDefault();

        //validar
        if(isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            guardarMensaje("Ambos campos son obligatorios");
            return;
        } else if(cantidad < 1) {
            guardarError(true);
            guardarMensaje("El gasto es incorrecto");
            return;
        } else if (cantidad > restante){
            guardarError(true);
            guardarMensaje("El gasto supera el restante");
            return;
        }
        guardarError(false);
        
        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //pasar el gasto al componente inicial
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //resetear el form
        guardarNombre('');
        guardarCantidad('');
    }

    return ( 
        <form onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>
            {error ?<Error mensaje={mensajeError}/> : null}
            <div className='campo'>
                <label>Nombre Gasto</label>
                <input 
                    type='text'
                    className='u-full-width'
                    placeholder='Ej. Transporte'
                    value= {nombre}
                    onChange = {e => guardarNombre(e.target.value)}
                />
            </div>
            <div className='campo'>
                <label>Cantidad Gasto</label>
                <input 
                    type='number'
                    className='u-full-width'
                    placeholder='Ej. 300'
                    value = {cantidad}
                    onChange = {e => guardarCantidad(parseInt(e.target.value, 10))}
                />
            </div>

            <input
                type='submit'
                className='button-primary u-full-width'
                value='Agregar gasto'
            />
        </form>
     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired,
    restante: PropTypes.number.isRequired
}
 
export default Formulario;