import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';


const Auth = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {register, handleSubmit, setError, formState: { errors, isValid }} = useForm({
        defaultValues: {
            email: 'admin@mail.com',
            password: 'password123'
        },
        mode: 'all'
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserData(values));

        if (!data.payload) {
            return alert('Не удалось авторизоваться!');
        }

        if ('access_token' in data.payload) {
            localStorage.setItem('token', data.payload.access_token);
        } else {
            alert('Не удалось авторизоваться!');
        }
    };

    if (isAuth) {
        return <Navigate to="/" />
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                    Вход в систему
                </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Логин"
                        autoFocus
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register('email', { required: 'Укажите логин'})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type="password"
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        {...register('password', { required: 'Укажите пароль'})}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Запомнить меня"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Войти
                    </Button>
                    {/* <Link to="/register">
                    <Button
                        fullWidth
                        variant="text"
                    >
                        Регистрация
                    </Button>
                    </Link> */}
                    </form>
            </Box>
        </Container>
    );
}

export { Auth };