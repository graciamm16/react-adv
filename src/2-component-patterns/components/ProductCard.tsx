import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import { createContext } from 'react';
import { ProductCardProps, ProductContextProps } from '../interfaces/interfaces';


export const ProductContext = createContext({} as ProductContextProps);
const {Provider} = ProductContext;


// Creamos pequeños componentes, facilitando que un usuario pueda crear su componente 
export const ProductCard = ({children, product}: ProductCardProps) => {
    const {counter, increaseBy} = useProduct();

    return (
        <Provider value={{
            counter,
            increaseBy,
            product
        }}>
            <div className={styles.productCard}>
                {children}
            </div>
        </Provider>
    )
}

