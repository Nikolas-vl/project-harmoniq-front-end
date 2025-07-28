import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from 'yup';
import { useNavigate, Link } from "react-router-dom";
import s from './LoginForm.module.css';
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOperations";
import { useState } from "react";
import toast from "react-hot-toast";


const validationSchema = object({
    email: string().email('Invalid email').required('Email is required'),
    password: string().min(6, 'At least 6 characters').required('Password is required'),
});


const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        try {
            const resultAction = await dispatch(login(values));

            if (login.fulfilled.match(resultAction)) {
                navigate('/');
            } else if (login.rejected.match(resultAction)) {
                setErrors({ password: 'Invalid email or password' });
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) { 
            console.error('Unexpected error during login', error);
            toast.error('Something went wrong. Please try again later.');

        } finally {
            setSubmitting(false);
        }
    };

    return (
            <div className={s.loginForm}>
                <h1 className={s.h1LoginForm}>Login</h1> 
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form noValidate className={s.loginFormFields}>
                            <div>
                            <label className={s.labelLoginForm}>Enter your email address</label>
                                <Field name='email' type="email" className={s.inputLoginForm} placeholder="email@gmail.com" />
                                <ErrorMessage name='email' component='div' className={s.errorLogin} />
                        </div>
                        <div>
                            <label className={s.labelLoginForm}>Enter a password</label>
                            <div className={s.inputWrapper}>
                                <span onClick={() => setShowPassword(prev => !prev)} className={s.seePass}>
                                    {showPassword ? (
                                        <svg width="24" height="24" viewBox="0 0 37 32" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="none" strokeLinejoin="miter" strokeLinecap="round" strokeMiterlimit="4" strokeWidth="2.2857" stroke="#000" d="M17.692 8.987c-8.193 0-14.835 7.922-14.835 9.935s6.642 9.935 14.835 9.935c8.193 0 14.835-7.922 14.835-9.935s-6.642-9.935-14.835-9.935zM17.692 8.987c-3.605 0-6.527 2.878-6.527 6.429s2.922 6.429 6.527 6.429c3.605 0 6.528-2.878 6.528-6.429s-2.923-6.429-6.528-6.429zM33.714 8.987c-4.519-3.713-9.794-5.844-15.429-5.844s-10.91 2.131-15.429 5.844" />
                                        </svg>) : (
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 34 32">
                                                <path fill="none" strokeLinejoin="miter" strokeLinecap="round" strokeMiterlimit="4" strokeWidth="2.1333" stroke="#000" d="M22.209 27.706c-1.737 0.807-3.666 1.332-5.696 1.332-7.647 0-13.846-7.448-13.846-9.34 0-1.073 1.992-3.93 5.11-6.205M28.698 22.692c1.060-1.275 1.661-2.404 1.661-2.993 0-1.892-6.199-9.34-13.846-9.34 3.365 0 6.092 2.706 6.092 6.044M16.513 22.446c-3.365 0-6.092-2.706-6.092-6.044M31.467 10.359c-4.217-3.49-9.141-5.494-14.4-5.494-1.896 0-3.747 0.26-5.538 0.757M2.667 10.359c0.391-0.324 0.788-0.634 1.191-0.932M2.667 2.667l26.743 27"></path>
                                            </svg>
                                    )}
                                </span>
                                <Field name='password' type={showPassword ? "text" : "password"} className={s.inputLoginForm} placeholder="*********" />
                            </div>
                            <ErrorMessage name='password' component='div' className={s.errorLogin} />
                            </div>
                            <button type="submit" disabled={isSubmitting} className={s.loginBtn}>Login</button>
                        </Form>
                    )}
                </Formik>
                <div>
                    <p className={s.askOfRegister}>Don't have an account? <Link to='/register' className={s.linkToRegister}> Register</Link></p>
                </div>
            </div>
    );
};

export default LoginForm;