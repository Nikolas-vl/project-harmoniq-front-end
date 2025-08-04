import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import styles from './RegisterForm.module.css';
import toast from 'react-hot-toast';
import eyeCrossed from '../../assets/icons/eye.svg';
import eye from '../../assets/icons/eye-crossed.svg';
import PasswordStrengthBar from 'react-password-strength-bar';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name must be at most 32 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .max(64, 'Email must be at most 64 characters')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,

    onSubmit: async values => {
      setIsSubmitting(true);
      try {
        const user = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        await dispatch(register(user)).unwrap();
        navigate('/photo');
      } catch (error) {
        toast.error(error.message || 'Registration failed');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    formik;

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Register</h1>
      <p className={styles.title_}>
        Join our community of mindfulness and wellbeing!
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Enter your name
          <input
            type="text"
            name="name"
            placeholder="Max"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.input}
          />
          <div className={styles.errorContainer}>
            {touched.name && errors.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </div>
        </label>

        <label className={styles.label}>
          Enter your email address
          <input
            type="email"
            name="email"
            placeholder="email@gmail.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.input}
          />
          <div className={styles.errorContainer}>
            {touched.email && errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
        </label>

        <label className={styles.label}>
          Create a strong password
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="*********"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
            />

            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowPassword(prev => !prev)}
              aria-label="Toggle password visibility"
            >
              <img
                src={showPassword ? eyeCrossed : eye}
                alt={showPassword ? 'Hide password' : 'Show password'}
                width="24"
                height="24"
              />
            </button>
          </div>
          <div className={styles.errorContainer}>
            {touched.password && errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div className={styles.strengthBarWrapper}>
            {/* <PasswordStrengthBar
              password={values.password}
              className={values.password ? '' : styles.strengthBarHidden}
            /> */}
            <PasswordStrengthBar
              password={values.password}
              className={styles.strengthBar}
            />
          </div>
        </label>

        <label className={styles.label}>
          Repeat your password
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="*********"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowConfirmPassword(prev => !prev)}
              aria-label="Toggle confirm password visibility"
            >
              <img
                src={showConfirmPassword ? eyeCrossed : eye}
                alt={showConfirmPassword ? 'Hide password' : 'Show password'}
                width="24"
                height="24"
              />
            </button>
          </div>
          <div className={styles.errorContainer}>
            {touched.confirmPassword && errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
        </label>

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create account'}
        </button>
      </form>
      <p className={styles.footerText}>
        Already have an account?{' '}
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      </p>
    </section>
  );
};

export default RegisterForm;
