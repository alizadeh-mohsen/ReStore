import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/http/agent";
import LoadingCompoent from "../../app/layout/loading/LoadingComponent";


export default function Catalog() {

    const [loading, setLoading] = useState(true)

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        agent.Catalog.list().then(data => setProducts(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingCompoent />


    return (

        <ProductList products={products} />
    )
}