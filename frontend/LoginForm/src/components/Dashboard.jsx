import { useEffect, useState } from "react";
import styles from "../modules.css/dashboard.module.css";
import LogoutBotton from "./LogoutBotton"

export default function Dashboard() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1>Welcome {user.FirstName}</h1>
      </header>

      <div className={styles.card}>

        <h2 className={styles.title}>User Details</h2>

        <div className={styles.details}>
          <p>
            <span>First Name:</span> {user.FirstName}
          </p>

          <p>
            <span>Last Name:</span> {user.LastName}
          </p>

          <p>
            <span>Email:</span> {user.email}
          </p>
        </div>
        < LogoutBotton /> 
      </div>
    </div>
  );
}