import { Box, Grid } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

interface Props {
    products: Product[]
}


export default function ProductList({ products }: Props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {
                    products.map(product => (
                        <Grid size={4} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
            </Grid>
        </Box>)

}