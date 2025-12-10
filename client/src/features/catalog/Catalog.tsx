import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingCompoent from "../../app/layout/loading/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import { Grid, Pagination, Paper } from "@mui/material";
import ProductSearchComponent from "./ProductSearchComponet";
import ProductOrderComponent from "./ProductOrderComponent";
import ProductBrandsComponent from "./ProductFiltersComponent";


export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
    const { productsLoaded, status,
        filtersLoaded, brands, types, productParams

    } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch, productParams])


    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync())
    }, [dispatch, filtersLoaded])

    if (status.includes('pending')) return <LoadingCompoent laodingMessage="loading products..." />


    return (
        <Grid container spacing={4}>
            <Grid size={3}>
                <Paper sx={{ mb: 2 }}>
                    <ProductSearchComponent />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <ProductOrderComponent />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <ProductBrandsComponent
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <ProductBrandsComponent
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                    />
                </Paper>
            </Grid>
            <Grid size={9}>
                <ProductList products={products} />
            </Grid>
            <Grid size={3}></Grid>
            <Grid size={9}>
                <Pagination count={10} size='large' color="secondary" />
            </Grid>
        </Grid >
    )
}