import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function MainLayout({ children }) {
  const { user, accountSignOut } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersColorScheme) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const handleSingOut = async () => {
    try {
      await accountSignOut();
    } catch (error) {
      console.warn(error);
    }
  };

  const handleChangeTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Crud con firebase Auth y Firestore</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        {/* <link rel="apple-touch-icon" href="/apple-icon.png" /> */}
        <meta name="theme-color" content={darkMode ? "#3067E8" : "#4585F3"} />
      </Head>

      <div className="bg-slate-100 dark:bg-slate-800">
        {user && (
          <header className="sticky top-0 z-10 h-16 px-5 backdrop-blur-md bg-slate-200/50 dark:text-slate-100 dark:bg-slate-900/80">
            <div className="flex items-center justify-between w-full h-full max-w-4xl m-auto">
              <div>
                <h1 className="text-2xl font-bold tracking-widest text-slate-700 dark:text-slate-200">
                  📚 CRUD
                </h1>
              </div>

              <div className="flex gap-2">
                <button
                  className="w-10 h-10 p-1 rounded-full bg-slate-100 dark:bg-slate-800"
                  onClick={handleChangeTheme}
                >
                  {darkMode ? "☀" : "🌙"}
                </button>

                <button
                  onClick={handleSingOut}
                  className="w-10 h-10 p-1 rounded-full bg-slate-100 dark:bg-slate-800"
                >
                  <picture className="rounded-full bg-slate-200">
                    <img
                      className="rounded-full"
                      src={user.photoURL || "/user.png"}
                      alt=""
                    />
                  </picture>
                </button>
              </div>
            </div>
          </header>
        )}

        <main>{children}</main>
      </div>
    </>
  );
}
