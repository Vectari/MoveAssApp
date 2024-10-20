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
      pl: "Move Ass App",
      en: "Move Ass App",
    },
    subtitle: {
      pl: "Śledź swoją drogę do utraty wagi",
      en: "Track Your Weight Loss Journey",
    },
    info: {
      pl: "Przejmij kontrolę nad swoimi celami fitness z Move Ass App! Nasze proste i intuicyjne narzędzie pomoże Ci monitorować postępy w odchudzaniu, wizualizować osiągnięcia i utrzymywać motywację. Niezależnie od tego, czy dopiero zaczynasz, czy zbliżasz się do swojego ostatecznego celu, Move Ass App będzie z Tobą na każdym kroku.",
      en: "Take control of your fitness goals with Move Ass App! Our simple and intuitive tool helps you monitor your weight loss progress, visualize your achievements, and stay motivated. Whether you're just starting or pushing towards your final goal, Move Ass App keeps you on track every step of the way.",
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
      en: "Weight",
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
