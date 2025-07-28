import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from 'yup';
import { useNavigate, Link } from "react-router-dom";
import s from './LoginForm.module.css';
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOperations";
import { useState } from "react";
import toast from "react-hot-toast";
import eyeOpen from '../../assets/icons/eyeOpen.svg';
import eyeCrossed from '../../assets/icons/eyeCrossed.svg';


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
                        <div className={s.fieldWrapper}>
                            <label className={s.labelLoginForm}>Enter your email address</label>
                                <Field name='email' type="email" className={s.inputLoginForm} placeholder="email@gmail.com" />
                                <ErrorMessage name='email' component='div' className={s.errorLogin} />
                        </div>
                        <div className={s.fieldWrapper}>
                            <label className={s.labelLoginForm}>Enter a password</label>
                            <div className={s.inputWrapper}>
                                <span onClick={() => setShowPassword(prev => !prev)} className={s.seePass}>
                                    <img src={showPassword ? eyeOpen : eyeCrossed} alt={showPassword ? "Show password" : "Hide password"} width={24} height={24}/>
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