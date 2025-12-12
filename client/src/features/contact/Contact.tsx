import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";


export default function Contact() {
    const { data, title } = useAppSelector(state => state.counter);
    const dispatch = useAppDispatch();

    return (
        <>
            <Typography variant="h2">
                <p>last action: {title}</p>
                <p>
                    sum: {data}
                </p>
            </Typography>

            <ButtonGroup>
                <Button onClick={() => dispatch(increment(1))} variant="contained" color='error'>increment by 1</Button>
                <Button onClick={() => dispatch(decrement(1))} variant="contained" color='primary'>decrement by 1</Button>
                <Button onClick={() => dispatch(increment(5))} variant="contained" color='secondary'>increment by 5</Button>
            </ButtonGroup>
        </>
    )
}