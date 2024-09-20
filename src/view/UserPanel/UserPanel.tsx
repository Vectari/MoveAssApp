import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../library/firebaseConfig";
import { useNavigate } from "react-router-dom";

export function UserPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (auth.currentUser === null) {
        console.log("Redirect to login");
        navigate("/login");
      } else {
        setUser(user);
        console.log(auth);
        console.log(user);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    console.log(auth.currentUser);
    navigate("/login");
  };

  return (
    <>
      <h1>User panel</h1>
      <div>{user ? <p>Welcome, {user.email}</p> : ""}</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
