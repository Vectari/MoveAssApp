export type Dictionary = "HomePage" | "LogInPage" | "SignUpPage" | "en" | "pl";

const dictionary: Record<Dictionary, Record<string, Record<string, string>>> = {
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
  en: {},
  pl: {},
};

export default dictionary;
