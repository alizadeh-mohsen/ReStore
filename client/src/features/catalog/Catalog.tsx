import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/loading/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearchComponent from "./ProductSearchComponet";
import ProductOrderComponent from "./ProductOrderComponent";
import ProductBrandsComponent from "./ProductFiltersComponent";
import PaginationComponent from "../../app/components/PaginationComponent";


export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
    const { productsLoaded,
        filtersLoaded, brands, types, productParams, metaData

    } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch, productParams])


    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync())
    }, [dispatch, filtersLoaded])

    if (!filtersLoaded) return <LoadingComponent laodingMessage="loading products..." />


    return (
        <Grid container columnSpacing={4}>
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
            <Grid size={9} sx={{ mb: 2 }}>
                {metaData &&
                    <PaginationComponent
                        metaData={metaData}
                        onPageChange={
                            (page: number) => {
                                console.info(page);
                                dispatch(setPageNumber({ pageNumber: page }))
                            }} />}
            </Grid>
        </Grid >
    )
}