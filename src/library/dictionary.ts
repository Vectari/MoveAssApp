export type Dictionary =
  | "NavBar"
  | "HomePage"
  | "LogInPage"
  | "SignUpPage"
  | "UserPanel"
  | "Settings"
  | "KcalStreak"
  | "AddProgress"
  | "WeightInfo"
  | "Loader"
  | "en"
  | "pl";

const dictionary: Record<Dictionary, Record<string, Record<string, string>>> = {
  NavBar: {
    home: {
      pl: "Strona Główna",
      en: "Home Page",
    },
    login: {
      pl: "Logowanie",
      en: "Log in",
    },
    signup: {
      pl: "Rejestracja",
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
    title: {
      pl: "Logowanie",
      en: "Log In",
    },
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
    title: {
      pl: "Rejestracja",
      en: "Sign Up",
    },
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
  UserPanel: {
    hello: {
      pl: "Cześć",
      en: "Hello",
    },
    dailyKcal: {
      pl: "Dzienne kcal",
      en: "Daily kcal",
    },
    openPortal: {
      pl: "Dodaj postęp",
      en: "Add Progress",
    },
  },
  Settings: {
    title: {
      pl: "Ustawienia",
      en: "Settings",
    },
  },
  KcalStreak: {
    dailyKcalStreak: {
      pl: "Dzienna seria kcal",
      en: "Daily kcal Streak",
    },
    addStreak: {
      pl: "Dodaj dzień",
      en: "Add day",
    },
    addedInfo: {
      pl: "Możesz dodać serie raz dziennie",
      en: "You can add streak once a day",
    },
    resetWarning: {
      pl: "Jeszcze dwa razy...",
      en: "Two more times...",
    },
  },
  AddProgress: {
    title: {
      pl: "Dodaj postęp",
      en: "Add progress",
    },
    addedStatus: {
      pl: "Dodano postęp!",
      en: "Progress added!",
    },
    weightStatus: {
      pl: "Dodaj wagę!",
      en: "Add weight!",
    },
    dimensionStatus: {
      pl: "Proszę uzupełnić wszystkie wymiary!",
      en: "Please fill in all dimensions!",
    },
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
    saveButton: {
      pl: "Zapisz",
      en: "Save",
    },
  },
  WeightInfo: {
    title: {
      pl: "Informacje o wadze",
      en: "Weight Info",
    },
    weightTarget: {
      pl: "Cel wagi",
      en: "Weight target",
    },
    latestWeight: {
      pl: "Ostatnia waga",
      en: "Latest weight",
    },
    weightToLose: {
      pl: "Do schudnięcia",
      en: "Weight to lose",
    },
    belowTarget: {
      pl: "Poniżej celu",
      en: "Below target",
    },
  },
  Loader: {
    loadingStatus: {
      pl: "Pobieranie",
      en: "Loading",
    },
    descriptionUserData: {
      pl: "danych",
      en: "data",
    },
    descriptionSettings: {
      pl: "ustawień",
      en: "settings",
    },
  },

  en: {},
  pl: {},
};

export default dictionary;
