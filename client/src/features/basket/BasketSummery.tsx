import { TableContainer, Paper, Table, TableRow, TableCell, TableBody, Button, Typography } from "@mui/material"
import { Basket } from "../../app/models/Basket"
import { formatCurrency } from "../../app/util/utils"

interface Props {
    basket: Basket
}

export default function BasketSummary({ basket }: Props) {

    const subtotal = basket.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0
    const deliveryFee = subtotal > 10000 ? 0 : 500
    const total = subtotal + deliveryFee

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }}>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{formatCurrency(subtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Deliver fee*</TableCell>
                        <TableCell align="right">
                            {formatCurrency(deliveryFee)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{formatCurrency(total)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>*Orders over $100 qualify for free delivery</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}><Button fullWidth variant="contained">checkout</Button></TableCell>
                        <TableCell></TableCell>
                    </TableRow>

                </TableBody>
            </Table >
        </TableContainer >
    )

}