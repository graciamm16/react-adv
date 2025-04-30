import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import { createContext } from 'react';
import { onChangeArgs, Product, ProductContextProps } from '../interfaces/interfaces';


export const ProductContext = createContext({} as ProductContextProps);
const {Provider} = ProductContext;

export interface Props{
    children?: React.ReactElement | React.ReactElement[];
    product: Product;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (args: onChangeArgs) => void;
    value?: number
}

// Creamos pequeños componentes, facilitando que un usuario pueda crear su componente 
export const ProductCard = ({children, product, className, style, onChange, value}: Props) => {
    // Función encargada de manejar el estado
    const {counter, increaseBy} = useProduct({onChange, product, value});

    return (
        <Provider value={{
            counter,
            increaseBy,
            product
        }}>
            <div
                className={`${styles.productCard} ${className}`}
                style={style}
            >
                {children}
            </div>
        </Provider>
    )
}