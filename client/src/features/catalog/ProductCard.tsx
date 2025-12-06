import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Product } from "../../app/models/product"
import { Link } from "react-router-dom";
import { formatCurrency } from "../../app/util/utils";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";


interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.basket)

    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {formatCurrency(product.price)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button loading={status.includes('pendingAddItem' + product.id)} size="small" onClick={() => dispatch(addBasketItemAsync({ productId: product.id, quantity: 1 }))} >Add to cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card >
    );
}
