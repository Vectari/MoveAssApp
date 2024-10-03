export type Dictionary =
  | "NavBar"
  | "HomePage"
  | "LogInPage"
  | "SignUpPage"
  | "AddProgress"
  | "en"
  | "pl";

const dictionary: Record<Dictionary, Record<string, Record<string, string>>> = {
  NavBar: {
    home: {
      pl: "Strona Główna",
      en: "Home Page",
    },
    login: {
      pl: "Zaloguj",
      en: "Log in",
    },
    signup: {
      pl: "Zarejestruj",
      en: "Sign up",
    },
    settings: {
      pl: "Ustawienia",
      en: "Settings",
    },
    logout: {
      pl: "Wyloguj",
      en: "Logout",
    },
  },
  HomePage: {
    title: {
      pl: "",
      en: "",
    },
  },
  LogInPage: {
    email: {
      pl: "Email",
      en: "Email",
    },
    password: {
      pl: "Hasło",
      en: "Password",
    },
    loginButton: {
      pl: "Zaloguj",
      en: "Login",
    },
  },
  SignUpPage: {
    email: {
      pl: "Email",
      en: "Email",
    },
    password: {
      pl: "Hasło",
      en: "Password",
    },
    adminPass: {
      pl: "Przepustka",
      en: "Pass",
    },
    signupButton: {
      pl: "Zarejestruj",
      en: "Sign Up",
    },
  },
  AddProgress: {
    weight: {
      pl: "Waga",
      en: "Weight"
    },
    dimensionA: {
      pl: "Wymiar A",
      en: "Dimension A",
    },
    dimensionB: {
      pl: "Wymiar B",
      en: "Dimension B",
    },
    dimensionC: {
      pl: "Wymiar C",
      en: "Dimension C",
    },
    dimensionD: {
      pl: "Wymiar D",
      en: "Dimension D",
    },
  },

  en: {},
  pl: {},
};

export default dictionary;
