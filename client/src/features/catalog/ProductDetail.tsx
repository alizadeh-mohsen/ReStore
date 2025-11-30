import { Product } from "../../app/models/product";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";



export default function ProductDetail() {

    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))

    }, [id])

    if (loading) return <Typography variant="h6">Loading....</Typography>

    if (!product) return <Typography variant="h6">product not found</Typography>

    return (
        <Grid container spacing={6}>
            <Grid columns={6} >
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }}></Divider>
                <Typography variant='h4' color='secondary.main'>
                    ${(product.price / 100).toFixed(2)}
                </Typography>

                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description.substring(0, 30)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}