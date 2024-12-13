import styled from 'styled-components';

interface ButtonProps {
    width?: string;
    height?: '50' | '40' | '30' | '25';
    borderRadius?: '25' | '16' | '6';
    variant: 'filled' | 'outlined';
    color: 'accent' | 'yellow' | 'red';
    fontSize?: '16' | '14' | '12'; // Розмір шрифту
    fontWeight?: '500' | '400'; // Вага шрифту
}

export const ButtonBase = styled.button<ButtonProps>`
    font-family: 'Montserrat', sans-serif;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    /* Розміри кнопки */
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => `${height}px`};

    /* Border-radius */
    border-radius: ${({ borderRadius }) =>
            borderRadius === '25' ? '25px' :
                    borderRadius === '16' ? '16px' : '6px'};

    /* Розмір шрифту */
    font-size: ${({ fontSize }) =>
            fontSize === '16' ? '16px' :
                    fontSize === '14' ? '14px' : '12px'};

    /* Вага шрифту */
    font-weight: ${({ fontWeight }) => fontWeight || '500'};

    /* Варіант кнопки */
    ${({ variant, color }) =>
            variant === 'filled' &&
            `
        background-color: var(--${color});
        color: var(--main);
        border: none;

        &:hover {
           opacity: 0.9;
        }
    `}

    ${({ variant, color }) =>
            variant === 'outlined' &&
            `
        background-color: transparent;
        color: var(--${color});
        border: ${color === 'yellow' || color === 'red' ? '1.5px' : '2px'} solid var(--${color});

        &:hover {
            background-color: var(--${color});
            color: var(--main);
        }
    `}
`;
