import MainLayout from "../components/layouts/MainLayout";
import AuthProvider from "../context/AuthContext";
import DataProvider from "../context/DataContext";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DataProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </DataProvider>
    </AuthProvider>
  );
}
