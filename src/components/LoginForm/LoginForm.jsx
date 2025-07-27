import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from 'yup';
import { useNavigate, Link } from "react-router-dom";
import s from './LoginForm.module.css';
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOperations";


const validationSchema = object({
    email: string().email('Invalid email').required('Email is required'),
    password: string().min(6, 'At least 6 characters').required('Password is required'),
});


const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        try {
            const resaltAction = await dispatch(login(values));

            if (login.fulfilled.match(resaltAction)) {
                navigate('/');
            } else if (login.rejected.match(resaltAction)) {
                setErrors( 'Invalid email or password');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
            <div className={s.loginForm}>
                <h1 className={s.h1LoginForm}>Login</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} className={s.loginFormFields}>
                    {({ isSubmitting }) => (
                        <Form noValidate className={s.loginFormFields}>
                            <div>
                                <label className={s.labelLoginForm}>Enter your email address</label>
                                <Field name='email' type="email" className={s.inputLoginForm} placeholder="email@gmail.com" />
                                <ErrorMessage name='email' component='div' className={s.errorLogin} />
                            </div>
                            <div>
                                <label className={s.labelLoginForm}>Enter a password</label>
                                <Field name='password' type="password" className={s.inputLoginForm} placeholder="*********" />
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