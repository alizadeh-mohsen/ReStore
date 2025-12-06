import { Typography, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Grid } from "@mui/material"
import { Add, Delete, Remove } from "@mui/icons-material"
import BasketSummary from "./BasketSummery"
import { formatCurrency } from "../../app/util/utils"
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"

export default function BasketComponent() {

    const dispatch = useAppDispatch()
    const { basket, status } = useAppSelector(state => state.basket)

    // useEffect(() => {
    //     agent.Basket.get()
    //         .then(basket => dispatch(setBasket(basket)))
    //         .catch(error => console.error(error))
    //         .finally(() => status.)
    // }, [dispatch])


    if (!basket) return <Typography variant="h3"> your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Subtotal</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center' >

                                        <img height={50} src={item.pictureUrl} alt={item.name} />

                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{formatCurrency(item.price)}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="secondary" loading={status === 'pendingAddItem' + item.productId}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId, quantity: 1 }))}
                                    >
                                        <Add />
                                    </IconButton>
                                    {item.quantity}
                                    <IconButton color="error" loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, name: 'rem' }))
                                        }>
                                        <Remove />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">{formatCurrency(item.price * item.quantity)}</TableCell>
                                <TableCell align="center">
                                    <IconButton loading={status === 'pendingRemoveItem' + item.productId + 'del'}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: 'del' }))}
                                        color="error">
                                        <Delete></Delete>
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >


            <Grid container justifyContent='flex-end' >

                <Grid columns={6} />
                <Grid columns={6} >
                    <BasketSummary basket={basket}></BasketSummary>
                </Grid>
            </Grid>
        </>
    )
}