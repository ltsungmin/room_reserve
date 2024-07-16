import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

function CustomInputNumber({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
  hasAdults,
  hasChildren,
  remainingAdults,
  remainingChildren,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleIncrement = () => {
    if (!disabled && inputValue < max && (!hasAdults || hasAdults)) {
      const newValue = Math.min(inputValue + step, max);
      setInputValue(newValue);
      onChange({ target: { name, value: newValue } });
    }
  };

  const handleDecrement = () => {
    if (!disabled && inputValue > min && !(inputValue === 1 && hasChildren)) {
      const newValue = Math.max(inputValue - step, min);
      setInputValue(newValue);
      onChange({ target: { name, value: newValue } });
    }
  };


  const handleChange = (event) => {
    const { value } = event.target;
    const parsedValue = value === '' ? '' : parseInt(value, 10);

    if (
      /^[0-9]*$/.test(value) &&
      (value === '' ||
        (!isNaN(parsedValue) &&
          parsedValue >= min &&
          parsedValue <= max))
    ) {
      if (
        (parsedValue === '' || parsedValue === 0 || parsedValue !== 0) &&
        !(parsedValue === 1 && hasChildren) &&
        (name.includes('adults')
          ? remainingAdults >= parsedValue
          : remainingChildren >= parsedValue)
      ) {
        setInputValue(parsedValue);
        onChange({ target: { name, value: parsedValue === '' ? 0 : parsedValue } });
      }
    }
  };

  const handleComponentBlur = (event) => {
    const { name, value } = event.target;
    const parsedValue = parseInt(value, 10);

    // Validate the input value
    if (
      /^[0-9]+$/.test(value) &&
      !isNaN(parsedValue) &&
      parsedValue >= min &&
      parsedValue <= max
    ) {
      onBlur({ target: { name, value: parsedValue } });
    } else {
      // Reset to the previous valid value if invalid input
      setInputValue(inputValue);
      onBlur({ target: { name, value: inputValue } });
    }
  };

  return (
    <div className="flex items-center" onBlur={handleComponentBlur}>
      <button
        className={classNames('px-2 py-2 rounded w-12 h-12', {
          'bg-white border border-blue-300 text-gray-500':
            !disabled && inputValue > min,
          'bg-gray-200 border border-gray-300 text-gray-400 cursor-not-allowed':
            disabled || inputValue <= min || (inputValue === 1 && hasChildren),
        })}
        onClick={handleDecrement}
        disabled={disabled || inputValue <= min}
      >
        -
      </button>
      <input
        type="text"
        className="mx-4 tracking-normal text-center px-2 py-2 w-12 h-12 border"
        name={name}
        value={inputValue === '' ? '0' : String(inputValue)}
        onChange={handleChange}
        onBlur={handleComponentBlur}
        pattern="[0-9]*"
        disabled={disabled}
      />
      <button
        className={classNames('px-2 py-2 rounded w-12 h-12', {
          'bg-white border border-blue-300 text-gray-500':
            !disabled && inputValue < max,
          'bg-gray-200 border border-gray-300 text-gray-400 cursor-not-allowed':
            disabled ||
            inputValue >= max ||
            (!hasAdults && hasAdults !== undefined),
        })}
        onClick={handleIncrement}
        disabled={disabled || inputValue >= max || hasAdults === false}
      >
        +
      </button>
    </div>
  );
}

export default CustomInputNumber;
