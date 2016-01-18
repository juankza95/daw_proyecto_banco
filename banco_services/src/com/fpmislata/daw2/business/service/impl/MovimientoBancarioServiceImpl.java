/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fpmislata.daw2.business.service.impl;

import com.fpmislata.daw2.business.domain.CuentaBancaria;
import com.fpmislata.daw2.business.domain.MovimientoBancario;
import com.fpmislata.daw2.business.domain.TipoMovimientoBancario;
import com.fpmislata.daw2.business.service.MovimientoBancarioService;
import com.fpmislata.daw2.core.exception.BusinessException;
import com.fpmislata.daw2.core.exception.BusinessMessage;
import com.fpmislata.daw2.persistence.dao.CuentaBancariaDAO;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Lliurex
 */
public class MovimientoBancarioServiceImpl extends GenericServiceImpl<MovimientoBancario, Integer> implements MovimientoBancarioService {
    @Autowired
    CuentaBancariaDAO cuentaBancariaDAO;
    
    
    @Override
    public MovimientoBancario insert(MovimientoBancario movimientoBancario) throws BusinessException{
        BigDecimal saldoPosterior;
        CuentaBancaria cuentaBancaria = cuentaBancariaDAO.get(movimientoBancario.getCuentaBancaria().getIdCuentaBancaria());
        if (movimientoBancario.getTipoMovimientoBancario() == TipoMovimientoBancario.INGRESO) {
            saldoPosterior = cuentaBancaria.getSaldo().add(movimientoBancario.getCantidad());
        }else if(movimientoBancario.getTipoMovimientoBancario() == TipoMovimientoBancario.DEDUCCION){
            saldoPosterior = cuentaBancaria.getSaldo().subtract(movimientoBancario.getCantidad());
        }else{
            throw new BusinessException(new BusinessMessage("Tipo Movimiento","El tipo de movimiento es inválido"));
        }
        
        
        cuentaBancaria.setSaldo(saldoPosterior);
        
        movimientoBancario.setSaldo(saldoPosterior);
        cuentaBancariaDAO.update(cuentaBancaria);
        movimientoBancario.setCuentaBancaria(cuentaBancaria);
        return this.genericDAO.insert(movimientoBancario);
    }
}