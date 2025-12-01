import { Button, ButtonGroup, Container, Typography } from "@mui/material";

import agent from "../../app/http/agent";
import { toast } from 'react-toastify';

export default function TestErrors() {
    const notify = () => toast("Wow so easy!");


    return (
        <Container>
            <Typography gutterBottom variant="h3">Errors for testing purpose</Typography>
            <ButtonGroup>
                <Button variant='contained' onClick={() => agent.Buggy.get400Error().catch(error => console.error(error))}>400- Bad Request</Button>
                <Button variant="outlined" onClick={() => agent.Buggy.get401Error().catch(error => console.error(error))}>401 - Unauthorized</Button>
                <Button variant='contained' onClick={() => agent.Buggy.get404Error().catch(error => console.error(error))}>404 - Not found</Button>
                <Button variant="outlined" onClick={() => agent.Buggy.get500Error().catch(error => console.error(error))}>500- Server error</Button>
                <Button variant='contained' onClick={() => agent.Buggy.getValidationError().catch(error => console.error(error))}>Validation Error</Button>
                <Button variant='outlined' onClick={notify}>Notify Error</Button>
            </ButtonGroup>
        </Container>
    )
}