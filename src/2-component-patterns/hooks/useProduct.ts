import { useEffect, useRef, useState } from "react";
import { onChangeArgs, Product } from "../interfaces/interfaces";

interface useProductArgs{
    product: Product;
    onChange?: (args: onChangeArgs) => void;
    value?: number;
}

/*
    Definimos un custom hook (useProduct) que maneja el contador de un producto, permitiendo incrementar o decrementar el contador.
    Ejecutamos la función onChange cuando el contador cambia y actualizamos el contador cuando su valor inicial (value) cambia.
*/

export const useProduct = ({onChange, product, value = 0}: useProductArgs) => {
    const [counter, setCounter] = useState(value);

    const isControlled = useRef(!!onChange);

    const increaseBy = (value: number) => {
        if(isControlled.current){
            return onChange!({count: value, product});
        }

        const newValue = Math.max(counter + value, 0);
        setCounter(newValue);

        onChange && onChange({count: newValue, product});       //if(onChange){onChange();}
    }

    useEffect(() => {
        setCounter(value);
    }, [value])
    

    return{
        counter,
        increaseBy
    }
}