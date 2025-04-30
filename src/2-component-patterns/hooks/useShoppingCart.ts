import { useState } from "react";
import { Product, ProductInCart } from "../interfaces/interfaces";


export const useShoppingCart = () => {
    const [shoppingCart, setShoppingCart] = useState<{[key: string]: ProductInCart}>({});

    const onProductCountChange = ({count, product}: {count: number, product: Product}) => {
        // console.log(count, product);
        setShoppingCart(oldShoppingCart => {
            const productInCart: ProductInCart = oldShoppingCart[product.id] || {...product, count: 0};

            if(Math.max(productInCart.count + count, 0) > 0){
                //productInCart.count = 20; --> Si existe que sea 20
                productInCart.count += count;
                return{
                    ...oldShoppingCart,
                    [product.id]: productInCart
                }
            }

            // Borrar el producto (articulo no existe o menor a 0)
            const {[product.id]: toDelete, ...rest} = oldShoppingCart;
            return rest;

            // if(count === 0){
            //     // delete ({...oldShoppingCart})[product.id]
            //     const {[product.id]: toDelete, ...rest} = oldShoppingCart;
            //     console.log({toDelete});

            //     return rest;
            // }

            // return {
            //     ...oldShoppingCart,
            //     [product.id]: {...product, count}
            // }
        });
    }

    return{
        shoppingCart,
        onProductCountChange
    }
}