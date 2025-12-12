import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { FieldValues, useForm } from 'react-hook-form';
import { RegisterDto } from '../../app/models/RegisterDto';
import { useAppDispatch } from '../../app/store/configureStore';
import { useHistory } from 'react-router-dom';
import { signUpIser } from './accountSlice';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignUp() {

    const history = useHistory();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    async function submitForm(data: FieldValues) {
        const registerDto: RegisterDto = {
            username: data.username,
            email: data.email,
            password: data.password
        }
        console.log('{registerDto}:', registerDto);
        dispatch(signUpIser(registerDto));
        history.push('/catalog');

    };

    return (
        <SignUpContainer direction="column" justifyContent="space-between">
            <Card>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(submitForm)}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <FormControl>
                        <FormLabel htmlFor="name">Full name</FormLabel>
                        <TextField
                            autoComplete="name"
                            {...register("username", { required: "filed is required" })}
                            required
                            fullWidth
                            id="name"
                            placeholder="Jon Snow"
                            error={!!errors.username}
                            helperText={errors?.username?.message as string}
                            color={'error'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            placeholder="your@email.com"
                            {...register("email", { required: 'email is required' })}

                            autoComplete="email"
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors?.email?.message as string}
                            color={'error'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            required
                            fullWidth
                            {...register("password", { required: 'password is required' })}
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            variant="outlined"
                            error={!!errors.password}
                            helperText={errors?.password?.message as string}
                            color={'error'}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Sign up
                    </Button>
                </Box>
            </Card>
        </SignUpContainer>

    );
}