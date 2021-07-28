import React, {Fragment} from 'react';
import {revisarPresupuesto} from '../helpers';
import PropTypes from 'prop-types';

const ControlPresupuesto = ({presupuesto, restante, totalGastos}) => {
    return ( 
        <Fragment>
            <div className="alert alert-primary">
                Presupuesto: $ {presupuesto}
            </div>
            <div className="alert alert-neutral">
                Total gastos: $ {totalGastos}
            </div>
            <div className={revisarPresupuesto(presupuesto, restante)}>
                Restante: $ {restante}
            </div>
        </Fragment>
     );
}

ControlPresupuesto.propTypes = {
    presupuesto: PropTypes.number.isRequired,
    restante: PropTypes.number.isRequired,
    totalGastos: PropTypes.number.isRequired
}
 
export default ControlPresupuesto;