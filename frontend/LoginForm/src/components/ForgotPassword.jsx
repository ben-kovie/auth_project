import styles from "../modules.css/forgotPassword.module.css";

function ForgotPassword() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");

    console.log("Reset link sent to:", email);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Forgot Password</h2>

        <p className={styles.text}>
          Enter your email and we will send you a password reset link.
        </p>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className={styles.input}
        />

        <button className={styles.button}>
          Send Reset Link
        </button>

        <div className={styles.back}>
          <a href="/">Back to Login</a>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;