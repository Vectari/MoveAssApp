import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../library/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.primary};
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.hover.primary};
  }
`;

export function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <h1>Home page</h1>
      <ThemeProvider theme={isDarkMode ? theme.darkMode : theme.lightMode}>
        <Container>
          <Button onClick={() => setIsDarkMode(!isDarkMode)}>
            Toggle Mode
          </Button>
        </Container>
      </ThemeProvider>
      <div>{user ? <p>Welcome, {user.email}</p> : <p>Go to login</p>}</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
