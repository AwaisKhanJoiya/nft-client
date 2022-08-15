import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./comps/Home";
import { AuthContext, AuthProvider } from "./contextApi/AuthContext";
import { useContext, lazy, Suspense } from "react";
import { useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";
import Footer from "./comps/Footer";

const Signup = lazy(() => import("./comps/authPapes/Signup"));
const Login = lazy(() => import("./comps/authPapes/Login"));
const Music = lazy(() => import("./comps/Music"));
const Points = lazy(() => import("./comps/Points"));
const Street = lazy(() => import("./comps/Street"));
const WalletPage = lazy(() => import("./comps/WalletPage"));
const Wallet = lazy(() => import("./comps/Wallet"));

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
        <Suspense fallback={"Loading..."}>
          <AuthProvider>
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
                <Route path="/music" element={<Music />} />
                <Route path="/score" element={<Points />} />
                <Route path="/street" element={<Street />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/wallet2" element={<Wallet />} />
              </Routes>
              <Footer />
            </div>
          </AuthProvider>
        </Suspense>
      </Router>
    </CookiesProvider>
  );
}
export default App;
