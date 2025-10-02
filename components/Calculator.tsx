
import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import { ButtonType } from '../types';

const Calculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  const calculate = (): string => {
    if (!previousValue || !operator) return currentValue;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return 'Error';

    let result: number;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '−':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) return 'Error';
        result = prev / current;
        break;
      default:
        return currentValue;
    }
    return String(Number(result.toPrecision(15)));
  };
  
  const handleNumberClick = (num: string) => {
    if (overwrite) {
      setCurrentValue(num);
      setOverwrite(false);
    } else {
      if (currentValue === '0') {
        setCurrentValue(num);
      } else {
        setCurrentValue(currentValue + num);
      }
    }
  };

  const handleDecimalClick = () => {
    if (overwrite) {
        setCurrentValue('0.');
        setOverwrite(false);
    } else if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const handleOperatorClick = (op: string) => {
    if (previousValue !== null && operator && !overwrite) {
      const result = calculate();
      setCurrentValue(result);
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(op);
    setOverwrite(true);
  };
  
  const handleEqualsClick = () => {
    if (operator && previousValue !== null) {
      const result = calculate();
      setCurrentValue(result);
      setPreviousValue(null);
      setOperator(null);
      setOverwrite(true);
    }
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'AC':
        setCurrentValue('0');
        setPreviousValue(null);
        setOperator(null);
        setOverwrite(true);
        break;
      case '⁺∕₋':
        if (currentValue !== '0' && currentValue !== 'Error') {
          setCurrentValue((parseFloat(currentValue) * -1).toString());
        }
        break;
      case '%':
        if (currentValue !== 'Error') {
          setCurrentValue((parseFloat(currentValue) / 100).toString());
          setOverwrite(true);
        }
        break;
    }
  };

  const buttonLayout = [
    { label: 'AC', type: ButtonType.ACTION, onClick: handleActionClick, className: 'aspect-square' },
    { label: '⁺∕₋', type: ButtonType.ACTION, onClick: handleActionClick, className: 'aspect-square' },
    { label: '%', type: ButtonType.ACTION, onClick: handleActionClick, className: 'aspect-square' },
    { label: '÷', type: ButtonType.OPERATOR, onClick: handleOperatorClick, className: 'aspect-square' },
    { label: '7', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'aspect-square' },
    { label: '8', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'aspect-square' },
    { label: '9', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'aspect-square' },
    { label: '×', type: ButtonType.OPERATOR, onClick: handleOperatorClick, className: 'aspect-square' },
    { label: '4', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'aspect-square' },
    { label: '5', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'aspect-square' },
    { label: '6', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'aspect-square' },
    { label: '−', type: ButtonType.OPERATOR, onClick: handleOperatorClick, className: 'aspect-square' },
    { label: '1', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'aspect-square' },
    { label: '2', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'aspect-square' },
    { label: '3', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'aspect-square' },
    { label: '+', type: ButtonType.OPERATOR, onClick: handleOperatorClick, className: 'aspect-square' },
    { label: '0', type: ButtonType.NUMBER, onClick: handleNumberClick, className: 'col-span-2 !rounded-full' },
    { label: '.', type: ButtonType.NUMBER, onClick: handleDecimalClick, className: 'aspect-square' },
    { label: '=', type: ButtonType.OPERATOR, onClick: handleEqualsClick, className: 'aspect-square' },
  ];
  
  return (
    <div className="w-full max-w-xs sm:max-w-sm mx-auto bg-[#6b423a] p-4 rounded-3xl shadow-2xl space-y-4">
      <Display value={currentValue} />
      <div className="grid grid-cols-4 gap-3">
        {buttonLayout.map((btn) => (
          <Button
            key={btn.label}
            label={btn.label}
            onClick={btn.onClick}
            type={btn.type}
            className={btn.className}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
