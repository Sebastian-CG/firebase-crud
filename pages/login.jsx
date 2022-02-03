import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Google from "../components/icons/Google";
import Button from "../components/Button";
import Alert from "../components/icons/Alert";

export default function Login() {
  const { signUp, signIn, signInWithGoogle, resetPassword, findErrorMessage } =
    useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setError(null);
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignIn) await signIn(newUser.email, newUser.password);
      if (!isSignIn) await signUp(newUser.email, newUser.password);
    } catch ({ message }) {
      setError(findErrorMessage(message));
      console.log(message);
    }

    setNewUser({ email: "", password: "" });
    setLoading(false);
  };

  const handleResetPassword = async () => {
    const { email } = newUser;

    if (!email) return setError("Please enter your email");

    try {
      await resetPassword(email);
      setError(
        `Se envio un correo a (${email}) con instrucciones para restablecer tu contraseña`
      );
    } catch ({ message }) {
      setError(findErrorMessage(message));
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch ({ message }) {
      setError(findErrorMessage(message));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid w-11/12 max-w-sm gap-8">
        {/* Formulario */}
        <div className="p-8 bg-white rounded-lg">
          <h1 className="mb-8 text-2xl font-semibold leading-7 text-slate-400">
            {isSignIn && (
              <>
                <span className="block">Log in with</span>
                <span className="block">your account</span>
              </>
            )}

            {!isSignIn && "Register"}
          </h1>

          {error && (
            <div
              onClick={() => setError(null)}
              className="flex items-center p-3 mb-4 border-2 border-yellow-300 rounded-lg bg-yellow-50"
            >
              <div className="mr-3">
                <Alert width="28px" height="28px" color="#FBDE53" />
              </div>
              <span className="font-mono text-xs font-semibold text-yellow-300">
                {error}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              className="block px-3 h-[3.125rem] rounded-lg border-[1px] border-slate-300 focus:border-blue-500 outline-none placeholder:text-slate-300"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={newUser.email}
              onChange={handleChange}
              required
            />
            <input
              className="block px-3 h-[3.125rem] rounded-lg border-[1px] border-slate-300 focus:border-blue-500 outline-none placeholder:text-slate-300"
              type="password"
              name="password"
              placeholder="**********"
              value={newUser.password}
              onChange={handleChange}
              required
            />

            <Button
              className="flex items-center justify-center w-full h-10 my-3 text-sm text-white bg-blue-500 rounded-lg"
              type="submit"
              loading={loading}
            >
              {isSignIn && "Sign in"}
              {!isSignIn && "Sign up"}
            </Button>
          </form>

          {isSignIn && (
            <button
              type="button"
              onClick={handleResetPassword}
              className="block text-sm text-blue-500 underline"
            >
              Forgot password?
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="block text-sm text-blue-500 underline"
          >
            {isSignIn ? "Create an account" : "I have an account"}
          </button>
        </div>

        {/* Botones de LogIn */}
        <div className="grid w-full gap-3">
          <button
            onClick={handleSignInWithGoogle}
            className="flex items-center justify-center w-full bg-white h-[3.125rem] rounded-lg"
          >
            <Google />
            <span className="ml-2">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}