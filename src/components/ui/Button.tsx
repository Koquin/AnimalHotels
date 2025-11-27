import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({children, onClick, type = 'button', disabled = false}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            >
            {children}
        </button>
    );
}

export default Button;