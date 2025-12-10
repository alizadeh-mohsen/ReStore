import * as React from 'react';
import { Button } from '@mui/material';

export default function LoadingIconButton() {
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <Button onClick={() => setLoading(true)} loading={loading}>
            Add to basket
        </Button>

    );
}
