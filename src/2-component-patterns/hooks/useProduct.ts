import { useEffect, useRef, useState } from "react";
import { InitialValues, onChangeArgs, Product } from "../interfaces/interfaces";

interface useProductArgs{
    product: Product;
    onChange?: (args: onChangeArgs) => void;
    value?: number;
    initialValues?: InitialValues;
}

/*
    Definimos un custom hook (useProduct) que maneja el contador de un producto, permitiendo incrementar o decrementar el contador.
    Ejecutamos la función onChange cuando el contador cambia y actualizamos el contador cuando su valor inicial (value) cambia.
*/

export const useProduct = ({onChange, product, value = 0, initialValues}: useProductArgs) => {
    const [counter, setCounter] = useState<number>(initialValues?.count || value);

    const isMounted = useRef(false);

    const increaseBy = (value: number) => {
        let newValue = Math.max(counter + value, 0);

        if(initialValues?.maxCount){
            newValue = Math.min(newValue, initialValues.maxCount);
        }

        setCounter(newValue);
        onChange && onChange({count: newValue, product});       //if(onChange){onChange();}
    }

    const reset = () => {
        setCounter(initialValues?.count || value);
    }

    useEffect(() => {
        if(!isMounted.current) return;
        setCounter(value);
    }, [value])

    // useEffect(() => {
    //     isMounted.current = true;
    // }, [])
    
    
    return{
        counter,
        increaseBy,
        reset,
        isMaxCountReached: !!initialValues?.count && initialValues.maxCount === counter,
        maxCount: initialValues?.maxCount,
    }
}