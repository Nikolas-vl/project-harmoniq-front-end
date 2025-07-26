import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import styles from './RegisterForm.module.css';

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

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,

    //     onSubmit: values => {
    //   console.log('Registered:', values);
    //   navigate('/upload-photo');
    // },
    // прибрав заглушку

    onSubmit: async values => {
      try {
        const user = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        await dispatch(register(user)).unwrap();
        navigate('/upload-photo');
      } catch (error) {
        console.error('Registration failed:', error);
        alert(error.message || 'Registration failed');
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    formik;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Register</h2>
      <h3 className={styles.title_}>
        Join our community of mindfulness and wellbeing!
      </h3>

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
            {showPassword ? (
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4107 17.4874C13.5963 17.8656 12.6923 18.1118 11.7405 18.1118C8.15598 18.1118 5.25017 14.6207 5.25017 13.7336C5.25017 13.2308 6.18382 11.8913 7.64549 10.8252M17.452 15.1367C17.9487 14.5391 18.2308 14.01 18.2308 13.7336C18.2308 12.8466 15.325 9.35549 11.7405 9.35549C13.3177 9.35549 14.5962 10.6238 14.5962 12.1884M11.7405 15.0213C10.1633 15.0213 8.88472 13.753 8.88472 12.1884M18.75 9.35557C16.7732 7.7195 14.4653 6.7802 12.0001 6.7802C11.1116 6.7802 10.2435 6.90222 9.40397 7.13492M5.25017 9.35557C5.43341 9.20392 5.6195 9.05825 5.8083 8.91876M5.25 5.75L17.7856 18.4061"
                  stroke="#070721"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7404 8.93179C8.15584 8.93179 5.25 12.3977 5.25 13.2784C5.25 14.1591 8.15584 17.625 11.7404 17.625C15.3249 17.625 18.2308 14.1591 18.2308 13.2784C18.2308 12.3977 15.3249 8.93179 11.7404 8.93179ZM11.7404 8.93179C10.1632 8.93179 8.88464 10.191 8.88464 11.7443C8.88464 13.2976 10.1632 14.5568 11.7404 14.5568C13.3176 14.5568 14.5962 13.2976 14.5962 11.7443C14.5962 10.191 13.3176 8.93179 11.7404 8.93179ZM18.75 8.93182C16.7731 7.30753 14.4652 6.375 12 6.375C9.53482 6.375 7.22688 7.30753 5.25 8.93182"
                  stroke="#070721"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
        <div className={styles.errorContainer}>
          {touched.password && errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
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
            {showConfirmPassword ? (
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4107 17.4874C13.5963 17.8656 12.6923 18.1118 11.7405 18.1118C8.15598 18.1118 5.25017 14.6207 5.25017 13.7336C5.25017 13.2308 6.18382 11.8913 7.64549 10.8252M17.452 15.1367C17.9487 14.5391 18.2308 14.01 18.2308 13.7336C18.2308 12.8466 15.325 9.35549 11.7405 9.35549C13.3177 9.35549 14.5962 10.6238 14.5962 12.1884M11.7405 15.0213C10.1633 15.0213 8.88472 13.753 8.88472 12.1884M18.75 9.35557C16.7732 7.7195 14.4653 6.7802 12.0001 6.7802C11.1116 6.7802 10.2435 6.90222 9.40397 7.13492M5.25017 9.35557C5.43341 9.20392 5.6195 9.05825 5.8083 8.91876M5.25 5.75L17.7856 18.4061"
                  stroke="#070721"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7404 8.93179C8.15584 8.93179 5.25 12.3977 5.25 13.2784C5.25 14.1591 8.15584 17.625 11.7404 17.625C15.3249 17.625 18.2308 14.1591 18.2308 13.2784C18.2308 12.3977 15.3249 8.93179 11.7404 8.93179ZM11.7404 8.93179C10.1632 8.93179 8.88464 10.191 8.88464 11.7443C8.88464 13.2976 10.1632 14.5568 11.7404 14.5568C13.3176 14.5568 14.5962 13.2976 14.5962 11.7443C14.5962 10.191 13.3176 8.93179 11.7404 8.93179ZM18.75 8.93182C16.7731 7.30753 14.4652 6.375 12 6.375C9.53482 6.375 7.22688 7.30753 5.25 8.93182"
                  stroke="#070721"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
        <div className={styles.errorContainer}>
          {touched.confirmPassword && errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>
      </label>

      <button type="submit" className={styles.button}>
        Create account
      </button>

      <p className={styles.footerText}>
        Already have an account?{' '}
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
