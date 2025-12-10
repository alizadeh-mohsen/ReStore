import { TextField } from "@mui/material";
import { setProductParams } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useState } from "react";


export default function ProductSearchComponent() {
    const { productParams } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm

    )
    return (
        <TextField
            onChange={event => {
                const term = event.target.value;
                setSearchTerm(term);
                if (term.length > 2 || term.length === 0)
                    dispatch(setProductParams({ searchTerm: term }))
            }}
            label='Search products'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}

        />
    )

}
