import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { LoginDto } from '../../app/models/LoginDto';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';
import { Mode } from '@mui/icons-material';

const defaultTheme = createTheme();

export default function Login() {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    async function submitForm(data: FieldValues) {
        const loginDto: LoginDto = {

            username: data.username,
            password: data.password
        }
        dispatch(signInUser(loginDto));
        history.push('/catalog')
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            {...register("username", { required: 'username is required' })}
                            autoFocus
                            error={!!errors.username}
                            helperText={errors?.username?.message as string}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            {...register("password", { required: 'password is required' })}
                            label="Password"
                            type="password"
                            id="password"
                            error={!!errors.password}
                            helperText={errors?.password?.message as string}
                        />

                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid >
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}