import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../config/api";
import styles from "../modules.css/login.module.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await api.post("/login", {
        email,
        password
      });

      const { accessToken, refreshToken, user } = res.data;

      // store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");

    } catch (err) {

      setError(
        err.response?.data?.message || "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleLogin}>

        <h2 className={styles.title}>Login</h2>

        {error && (
          <p className={styles.error}>{error}</p>
        )}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* <div className={styles.links}>
          <Link to="/forgot">Forgot Password?</Link>
        </div> */}

        <div className={styles.register}>
          <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>

      </form>

    </div>
  );
}