import React from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; 
}

const InputField: React.FC<InputFieldProps> = ({label, type, value, onChange, placeholder}) => {
    return (
        <div>
        <label htmlFor={label}>{label}:</label>
        <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        />
        </div>
    )
}

export default InputField

