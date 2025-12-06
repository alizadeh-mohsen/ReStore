import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingCompoent from "../../app/layout/loading/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";


export default function Catalog() {

    const products = useAppSelector(productSelectors.selectAll)
    const { productsLoaded, status } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch])

    if (status.includes('pending')) return <LoadingCompoent laodingMessage="loading products..." />


    return (

        <ProductList products={products} />
    )
}