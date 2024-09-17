// type HomePageTranslations = {
//   pl: string;
//   en: string;
// };

// type LogInPageTranslations = {
//   email: {
//     pl: string;
//     en: string;
//   };
//   password: {
//     pl: string;
//     en: string;
//   };
//   loginButton: {
//     pl: string;
//     en: string;
//   };
// };

// type SignUpPageTranslations = {
//   pl: string;
//   en: string;
// };

// export type Dictionary = {
//   HomePage: HomePageTranslations;
//   LogInPage: LogInPageTranslations;
//   SignUpPage: SignUpPageTranslations;
// };

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
    repassword: {
      pl: "Hasło",
      en: "Password",
    },
  },
  en: {},
  pl: {},
};

export default dictionary;
