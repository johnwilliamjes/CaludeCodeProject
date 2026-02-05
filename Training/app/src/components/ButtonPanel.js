import React from 'react';
import Button from './Button';

function ButtonPanel({ 
  onNumber, 
  onDecimal, 
  onOperation, 
  onEquals, 
  onClear, 
  onPercentage,
  onSign 
}) {
  const buttons = [
    { label: 'AC', handler: onClear, className: 'function' },
    { label: '±', handler: onSign, className: 'function' },
    { label: '%', handler: onPercentage, className: 'function' },
    { label: '/', handler: () => onOperation('/'), className: 'operator' },
    
    { label: '7', handler: () => onNumber(7), className: 'number' },
    { label: '8', handler: () => onNumber(8), className: 'number' },
    { label: '9', handler: () => onNumber(9), className: 'number' },
    { label: '*', handler: () => onOperation('*'), className: 'operator' },
    
    { label: '4', handler: () => onNumber(4), className: 'number' },
    { label: '5', handler: () => onNumber(5), className: 'number' },
    { label: '6', handler: () => onNumber(6), className: 'number' },
    { label: '-', handler: () => onOperation('-'), className: 'operator' },
    
    { label: '1', handler: () => onNumber(1), className: 'number' },
    { label: '2', handler: () => onNumber(2), className: 'number' },
    { label: '3', handler: () => onNumber(3), className: 'number' },
    { label: '+', handler: () => onOperation('+'), className: 'operator' },
    
    { label: '0', handler: () => onNumber(0), className: 'number zero' },
    { label: '.', handler: onDecimal, className: 'number' },
    { label: '=', handler: onEquals, className: 'operator' }
  ];

  return (
    <div className="button-panel">
      {buttons.map((button, index) => (
        <Button
          key={index}
          label={button.label}
          onClick={button.handler}
          className={button.className}
        />
      ))}
    </div>
  );
}

export default ButtonPanel;
