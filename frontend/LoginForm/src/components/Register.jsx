import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../config/api";
import styles from "../modules.css/register.module.css";

export default function Register() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await api.post("/register", {
        firstName,
        lastName,
        email,
        password
      });

      console.log(res.data);

      // After successful registration send user to login
      navigate("/");

    } catch (err) {

      setError(
        err.response?.data?.message || "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleRegister}>

        <h2 className={styles.title}>Register</h2>

        {error && (
          <p className={styles.error}>{error}</p>
        )}

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className={styles.input}
          required
        />

        <button
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <div className={styles.register}>
          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>

      </form>

    </div>
  );
}