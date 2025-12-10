import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { setProductParams } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useState } from "react";

const sortOptions = [
    { value: 'name', label: 'Alphabetically' },
    { value: 'price-desc', label: 'Price: High to low' },
    { value: 'price', label: 'Price: Low to high' }
]

export default function ProductOrderComponent() {

    const dispatch = useAppDispatch()
    const { productParams } = useAppSelector(state => state.catalog)
    const [orderBy, setOrderBy] = useState(productParams.orderBy)
    return (
        <FormControl>
            <RadioGroup>
                {sortOptions.map((item) => (
                    <FormControlLabel key={item.label} value={item.value}
                        checked={item.value === orderBy}
                        control={<Radio />} label={item.label}
                        onChange={(event: any) => {
                            setOrderBy(event.target.value)
                            dispatch(setProductParams({ orderBy: event.target.value }))
                        }
                        }
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}