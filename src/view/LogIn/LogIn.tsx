import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../library/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";

export function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/panel");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleAutoLoginOne = () => {
    setEmail("test@test.com");
    setPassword("test123");
  };

  const handleAutoLoginTwo = () => {
    setEmail("test2@test2.com");
    setPassword("test222");
  };

  return (
    <>
      <h2>{translate("LogInPage", "title")}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>{translate("LogInPage", "email")}: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{translate("LogInPage", "password")}: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{translate("LogInPage", "loginButton")}</button>
      </form>
      <br />
      <div>
        <button onClick={handleAutoLoginOne}>AutoLogin_ONE</button>
      </div>
      <div>
        <button onClick={handleAutoLoginTwo}>AutoLogin_TWO</button>
      </div>
    </>
  );
}
