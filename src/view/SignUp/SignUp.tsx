import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../library/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "../../hooks/useTranslation";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    navigate("/panel");

    if (adminPass === import.meta.env.VITE_ADMIN_PASS) {
      try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Save user information to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
        });
        setSuccess(true);
      } catch (err) {
        setError((err as Error).message);
      }
    } else {
      alert("Ask admin for Admin Pass");
    }
  };

  return (
    <>
      <h1>SignUp page</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>{translate("SignUpPage", "email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{translate("SignUpPage", "password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{translate("SignUpPage", "adminPass")}</label>
          <input
            type="password"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            required
          />
        </div>
        <button type="submit">{translate("SignUpPage", "signupButton")}</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Sign up successful!</p>}
    </>
  );
}
