import Head from "next/head";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function MainLayout({ children }) {
  const { user, accountSignOut } = useContext(AuthContext);

  const handleSingOut = async () => {
    try {
      await accountSignOut();
    } catch (error) {
      console.warn(error);
    }
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
        <meta name="theme-color" content="#4585F3" />
      </Head>

      {user && (
        <header className="h-16 px-5 bg-slate-200">
          <div className="flex items-center justify-between w-full h-full max-w-4xl m-auto">
            <div>
              <h1>CRUD</h1>
            </div>

            <button
              onClick={handleSingOut}
              className="grid grid-cols-[2rem_6.25rem] grid-rows-[2rem] items-center gap-3 p-1 w-40 rounded-full bg-slate-100"
            >
              <picture className="h-full overflow-hidden rounded-full bg-slate-200">
                <img src={user.photoURL} alt="" />
              </picture>
              <span className="overflow-hidden font-semibold text-md text-slate-400 whitespace-nowrap text-ellipsis">
                {user.displayName || user.email}
              </span>
            </button>
          </div>
        </header>
      )}

      <main className="min-h-screen bg-slate-100">{children}</main>
    </>
  );
}
