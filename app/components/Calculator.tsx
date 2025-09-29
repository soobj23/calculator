'use client';

import { useState } from 'react';
import Display from './Display';
import Button from './Button';
import ThemeSelector from './ThemeSelector';
import { Theme, CalculatorState } from '../types';

const Calculator = () => {
  const [theme, setTheme] = useState<Theme>('neon');
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    memory: 0,
  });

  const inputNumber = (num: string) => {
    setState(prevState => {
      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: num,
          waitingForOperand: false,
        };
      } else {
        return {
          ...prevState,
          display: prevState.display === '0' ? num : prevState.display + num,
        };
      }
    });
  };

  const inputOperation = (nextOperation: string) => {
    setState(prevState => {
      const inputValue = parseFloat(prevState.display);

      if (prevState.previousValue === null) {
        return {
          ...prevState,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
        };
      } else if (prevState.operation) {
        const currentValue = prevState.previousValue || 0;
        const newValue = calculate(currentValue, inputValue, prevState.operation);

        return {
          ...prevState,
          display: String(newValue),
          previousValue: newValue,
          operation: nextOperation,
          waitingForOperand: true,
        };
      }

      return {
        ...prevState,
        operation: nextOperation,
        waitingForOperand: true,
      };
    });
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case '%':
        return firstValue % secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    setState(prevState => {
      const inputValue = parseFloat(prevState.display);

      if (prevState.previousValue !== null && prevState.operation) {
        const newValue = calculate(prevState.previousValue, inputValue, prevState.operation);
        return {
          ...prevState,
          display: String(newValue),
          previousValue: null,
          operation: null,
          waitingForOperand: true,
        };
      }
      return prevState;
    });
  };

  const clear = () => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      memory: state.memory,
    });
  };

  const clearEntry = () => {
    setState(prevState => ({
      ...prevState,
      display: '0',
    }));
  };

  const toggleSign = () => {
    setState(prevState => ({
      ...prevState,
      display: prevState.display.charAt(0) === '-' 
        ? prevState.display.slice(1) 
        : '-' + prevState.display,
    }));
  };

  const inputDecimal = () => {
    setState(prevState => {
      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: '0.',
          waitingForOperand: false,
        };
      } else if (prevState.display.indexOf('.') === -1) {
        return {
          ...prevState,
          display: prevState.display + '.',
        };
      }
      return prevState;
    });
  };

  const memoryClear = () => {
    setState(prevState => ({
      ...prevState,
      memory: 0,
    }));
  };

  const memoryRecall = () => {
    setState(prevState => ({
      ...prevState,
      display: String(prevState.memory),
      waitingForOperand: true,
    }));
  };

  const memoryAdd = () => {
    setState(prevState => ({
      ...prevState,
      memory: prevState.memory + parseFloat(prevState.display),
    }));
  };

  const memorySubtract = () => {
    setState(prevState => ({
      ...prevState,
      memory: prevState.memory - parseFloat(prevState.display),
    }));
  };

  const square = () => {
    setState(prevState => ({
      ...prevState,
      display: String(Math.pow(parseFloat(prevState.display), 2)),
    }));
  };

  const squareRoot = () => {
    setState(prevState => ({
      ...prevState,
      display: String(Math.sqrt(parseFloat(prevState.display))),
    }));
  };

  const reciprocal = () => {
    setState(prevState => {
      const value = parseFloat(prevState.display);
      return {
        ...prevState,
        display: value !== 0 ? String(1 / value) : 'Error',
      };
    });
  };

  const getThemeClasses = () => {
    const themes = {
      neon: {
        container: 'bg-gray-900 border border-gray-700 shadow-lg',
        display: 'bg-gray-800 text-blue-400 border border-gray-600',
        button: 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 hover:text-white',
        operator: 'bg-blue-700 text-blue-100 border border-blue-600 hover:bg-blue-600 hover:text-white',
        special: 'bg-red-700 text-red-100 border border-red-600 hover:bg-red-600 hover:text-white',
      },
      retro: {
        container: 'bg-gray-800 border border-gray-600 shadow-lg',
        display: 'bg-gray-900 text-green-400 border border-gray-600 font-mono',
        button: 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 hover:text-white font-mono',
        operator: 'bg-green-700 text-green-100 border border-green-600 hover:bg-green-600 hover:text-white font-mono',
        special: 'bg-red-700 text-red-100 border border-red-600 hover:bg-red-600 hover:text-white font-mono',
      },
      space: {
        container: 'bg-slate-800 border border-slate-600 shadow-lg',
        display: 'bg-slate-900 text-indigo-300 border border-slate-600',
        button: 'bg-slate-700 text-slate-200 border border-slate-600 hover:bg-slate-600 hover:text-white',
        operator: 'bg-indigo-700 text-indigo-100 border border-indigo-600 hover:bg-indigo-600 hover:text-white',
        special: 'bg-red-700 text-red-100 border border-red-600 hover:bg-red-600 hover:text-white',
      },
      nature: {
        container: 'bg-gray-800 border border-gray-600 shadow-lg',
        display: 'bg-gray-900 text-emerald-300 border border-gray-600',
        button: 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 hover:text-white',
        operator: 'bg-emerald-700 text-emerald-100 border border-emerald-600 hover:bg-emerald-600 hover:text-white',
        special: 'bg-red-700 text-red-100 border border-red-600 hover:bg-red-600 hover:text-white',
      },
    };
    return themes[theme];
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="flex flex-col items-center space-y-3">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      
      <div className={`calculator-container ${themeClasses.container} rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-sm w-full`}>
        <Display value={state.display} theme={themeClasses.display} />
        
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {/* Memory functions */}
          <Button onClick={memoryClear} className={themeClasses.special}>MC</Button>
          <Button onClick={memoryRecall} className={themeClasses.special}>MR</Button>
          <Button onClick={memoryAdd} className={themeClasses.special}>M+</Button>
          <Button onClick={memorySubtract} className={themeClasses.special}>M-</Button>
          
          {/* Special functions */}
          <Button onClick={square} className={themeClasses.special}>x²</Button>
          <Button onClick={squareRoot} className={themeClasses.special}>√</Button>
          <Button onClick={reciprocal} className={themeClasses.special}>1/x</Button>
          <Button onClick={clear} className={themeClasses.special}>C</Button>
          
          {/* Numbers and operations */}
          <Button onClick={clearEntry} className={themeClasses.button}>CE</Button>
          <Button onClick={toggleSign} className={themeClasses.button}>±</Button>
          <Button onClick={() => inputOperation('%')} className={themeClasses.operator}>%</Button>
          <Button onClick={() => inputOperation('÷')} className={themeClasses.operator}>÷</Button>
          
          <Button onClick={() => inputNumber('7')} className={themeClasses.button}>7</Button>
          <Button onClick={() => inputNumber('8')} className={themeClasses.button}>8</Button>
          <Button onClick={() => inputNumber('9')} className={themeClasses.button}>9</Button>
          <Button onClick={() => inputOperation('×')} className={themeClasses.operator}>×</Button>
          
          <Button onClick={() => inputNumber('4')} className={themeClasses.button}>4</Button>
          <Button onClick={() => inputNumber('5')} className={themeClasses.button}>5</Button>
          <Button onClick={() => inputNumber('6')} className={themeClasses.button}>6</Button>
          <Button onClick={() => inputOperation('-')} className={themeClasses.operator}>-</Button>
          
          <Button onClick={() => inputNumber('1')} className={themeClasses.button}>1</Button>
          <Button onClick={() => inputNumber('2')} className={themeClasses.button}>2</Button>
          <Button onClick={() => inputNumber('3')} className={themeClasses.button}>3</Button>
          <Button onClick={() => inputOperation('+')} className={themeClasses.operator}>+</Button>
          
          <Button onClick={() => inputNumber('0')} className={`${themeClasses.button} col-span-2`}>0</Button>
          <Button onClick={inputDecimal} className={themeClasses.button}>.</Button>
          <Button onClick={performCalculation} className={themeClasses.operator}>=</Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
