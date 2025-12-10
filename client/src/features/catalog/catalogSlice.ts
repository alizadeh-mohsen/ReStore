import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import { toast } from "react-toastify";
import agent from "../../app/http/agent";
import { RootState } from "../../app/store/configureStore";
import { Filters } from "../../app/models/Filters";
import { ProdcutsParams } from "../../app/models/ProductParams";
import { MetaData } from "../../app/models/PaginatedResponose";

interface CatalogState {
    productsLoaded: boolean
    filtersLoaded: boolean
    status: string,
    brands: string[],
    types: string[],
    productParams: ProdcutsParams,
    metaData: MetaData | null
}

const productsAdapter = createEntityAdapter<Product>()

function getAxiosParams(productParams: ProdcutsParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.searchTerm)
        params.append('searchTerm', productParams.searchTerm);
    if (productParams.brands.length > 0)
        params.append('brands', productParams.brands.toString());
    if (productParams.types.length > 0)
        params.append('types', productParams.types.toString());

    return params;
}


export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    'catalog/fetchProductsAsync',
    async (_, thunkApi) => {
        try {
            const params = getAxiosParams(thunkApi.getState().catalog.productParams)
            const response = await agent.Catalog.list(params)
            thunkApi.dispatch(setMetaData(response.metaData))
            return response.items
        }
        catch (error: any) {
            thunkApi.rejectWithValue({ error: error.data })
            toast.error(error)
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkApi) => {
        try {
            return await agent.Catalog.details(productId)
        }
        catch (error: any) {
            thunkApi.rejectWithValue({ error: error.data })
            toast.error(error)
        }
    }
)

export const fetchFiltersAsync = createAsyncThunk<Filters>(
    'catalog/Filters',
    async (_, thunkApi) => {
        try {
            return await agent.Catalog.getFilters()
        }
        catch (error: any) {
            thunkApi.rejectWithValue({ error: error.data })
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        status: 'idle',
        filtersLoaded: false,
        brands: [],
        types: [],
        productParams: {
            pageNumber: 1,
            pageSize: 5,
            orderBy: 'name',
            types: [],
            brands: []
        },
        metaData: null

    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 };
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload };
        },
        resetProductParams: (state) => {
            state.productParams.orderBy = 'name';
            state.productParams.pageSize = 5;
            state.productParams.pageNumber = 1
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts'
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.productsLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.error(action.payload)
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct'
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.error(action.payload)
        });
        builder.addCase(fetchFiltersAsync.pending, (state) => {
            state.status = 'pendingFetchFilters'
        });
        builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
        });
        builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.error(action.payload)
        })

    })

})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)
export const { setProductParams, resetProductParams, setMetaData, setPageNumber } = catalogSlice.actions;

