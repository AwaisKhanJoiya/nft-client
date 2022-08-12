import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./comps/Home";
import { AuthContext, AuthProvider } from "./contextApi/AuthContext";
import { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import Signup from "./comps/authPapes/Signup";
import Login from "./comps/authPapes/Login";
import Music from "./comps/Music";
import Points from "./comps/Points";
import Street from "./comps/Street";
import WalletPage from "./comps/WalletPage";
import { CookiesProvider } from "react-cookie";
import Wallet from "./comps/Wallet";

function App() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const [cookies, setCookies] = useCookies();

  // const checkUser = async () => {
  //   try {
  //     const res = await fetch("https://api.shatokens.com/checkuser", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ token: cookies.jwt }),
  //     });
  //     console.log(cookies.jwt);
  //     const data = await res.json();
  //     console.log(data.status);
  //     if (data.status === "bad auth") {
  //       setIsAuth(false);
  //     } else if (data.status === "good auth") {
  //       setIsAuth(true);
  //     }
  //   } catch (error) {
  //     console.log("catch");
  //     setIsAuth(false);
  //     console.log("error: ", error);
  //   }
  // };

  // useEffect(() => {
  //   checkUser();
  // }, []);

  console.log(isAuth);
  return (
    <CookiesProvider>
      <Router>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/music" element={<Music />} />
              <Route
                path="/score"
                element={cookies.jwt ? <Points /> : <Navigate to={"/login"} />}
              />
              <Route path="/street" element={<Street />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/wallet2" element={<Wallet />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </CookiesProvider>
  );
}
export default App;
