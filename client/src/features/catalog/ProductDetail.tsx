import { Product } from "../../app/models/product";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Divider, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import agent from "../../app/http/agent";
import { formatCurrency } from "../../app/util/utils";
import { toast } from "react-toastify";



export default function ProductDetail() {

    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.details(parseInt(id))
            .then(product => setProduct(product))
            .catch(error => toast.error(error))
            .finally(() => setLoading(false))

    }, [id])

    if (loading) return <Typography variant="h6">Loading....</Typography>

    if (!product) return <Typography variant="h6">product not found</Typography>

    return (
        <Grid container spacing={6}>
            <Grid columns={6} >
                <img src={product.pictureUrl} alt={product.name} height={500} />
            </Grid>
            <Grid>
                <Typography variant='h5'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }}></Divider>
                <Typography variant='h4' color='secondary.main'>
                    {formatCurrency(product.price)}
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
                                <TableCell>{product.description.substring(0, 10)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        label="With normal TextField"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <InputAdornment position="start">{product.quantityInStock}</InputAdornment>,
                                            },
                                        }}
                                    />
                                </TableCell>
                                <TableCell><Button >Update quantity</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}