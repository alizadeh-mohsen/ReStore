import { Box, Grid } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"
import { useAppSelector } from "../../app/store/configureStore"
import ProductCardSkeleton from "./PorductCardSkeleton"

interface Props {
    products: Product[]
}


export default function ProductList({ products }: Props) {

    const { productsLoaded } = useAppSelector(state => state.catalog)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {
                    products.map(product => (
                        <Grid size={4} key={product.id}>

                            {productsLoaded ? (
                                <ProductCard product={product} />
                            ) : (
                                <ProductCardSkeleton />
                            )}

                        </Grid>
                    ))}
            </Grid>
        </Box>)

}