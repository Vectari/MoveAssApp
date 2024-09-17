type HomePageTranslations = {
  pl: string;
  en: string;
};

type LogInPageTranslations = {
  email: {
    pl: string;
    en: string;
  };
  password: {
    pl: string;
    en: string;
  };
  loginButton: {
    pl: string;
    en: string;
  };
};

type SignUpPageTranslations = {
  pl: string;
  en: string;
};

export type Dictionary = {
  HomePage: HomePageTranslations;
  LogInPage: LogInPageTranslations;
  SignUpPage: SignUpPageTranslations;
};

const dictionary: Dictionary = {
  HomePage: {
    pl: "",
    en: "",
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
    pl: "",
    en: "",
  },
};

export default dictionary;
