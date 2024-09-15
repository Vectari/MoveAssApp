import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../library/firebaseConfig";
import dictionary from "../../library/dictionary";
import { useNavigate } from "react-router-dom";

export function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or show a success message
      console.log("LogIn Success!");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleAutoLogin = () => {
    setEmail("test@test.com");
    setPassword("test123");
  };

  return (
    <>
      <h2>Log In Page</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{dictionary.LogInPage.en}</button>
      </form>
      <p>test@test.com</p>
      <p>test123</p>
      <button onClick={handleAutoLogin}>AutoLogin</button>
    </>
  );
}
