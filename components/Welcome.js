// useState: A React hook used to create state variables in a functional component.
import { useState } from 'react';
// Importing the css for this page
import styles from '../styles/Welcome.module.css';

export default function WelcomePage({ onLogin }) {
  //React state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // handle any errors

  //validation funnction
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log("Logged in as:", { name, email });
      onLogin(); // Trigger login success
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Welcome to Finance Tracker</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}
