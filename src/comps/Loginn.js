import { useRef, useState } from "react";
import { useCookies } from "react-cookie";

const Login = () => {

    const [emailErr, setEmailErr] = useState();
    const [pwdErr, setPwdErr] = useState();
    const [cookies, setCookies] = useCookies();

    const emailRef = useRef()
    const pwdRef = useRef()

    const handleSubmit = async(e) => {
        setEmailErr(null)
        setPwdErr(null)
        e.preventDefault();
        const email = emailRef.current.value
        const password = pwdRef.current.value
        // console.log(emailRef.current.value)

        try {
            const res = await fetch("http://localhost:8000/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            if (res.status === 201) {
                setCookies('jwt', data.token, { path: '/' })
            } else {
                throw data
            }
        } catch (error) {
            // console.log("hillo")
            console.log(error)
            if(error.errors) {
                if(error.errors.email) {
                    setEmailErr(error.errors.email)
                }
                if(error.errors.password) {
                    setPwdErr(error.errors.password)
                }
            }
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
            <h1>Login</h1>
            <label>First name</label>
            <input type="email" ref={emailRef} placeholder="email" className="email-field form-control input-lg"/>
            {emailErr && <div className="email-error error">{emailErr}</div>}
            <input type="password" ref={pwdRef} placeholder="password" className="password-field" />
            {pwdErr && <div className="password-error error">{pwdErr}</div>}
            <button className="login-btn">SUBMIT</button>
        </form>
    );
}

export default Login;