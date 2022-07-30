import { useRef, useState } from "react";
import { useCookies } from "react-cookie";

const Signup = () => {

    const [emailErr, setEmailErr] = useState(null);
    const [pwdErr, setPwdErr] = useState(null);
    const [cookies, setCookies] = useCookies();

    const emailRef = useRef()
    const pwdRef = useRef()

    const handleSubmit = async (e) => {
        setEmailErr(null)
        setPwdErr(null)
        e.preventDefault();
        const email = emailRef.current.value
        const password = pwdRef.current.value

        try {
            const res = await fetch("http://localhost:8000/signup", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            if (res.status === 201) {
                setCookies('jwt', data.token, { path: '/' })
                console.log(data)
            } else {
                throw data
            }
        } catch (error) {
            // console.log("hillo")
            // console.log(error)
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
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Signup</h1>
            <input type="email" ref={emailRef} placeholder="email" />
            {emailErr && <div className="email-error error">{emailErr}</div>}
            <input type="password" ref={pwdRef} placeholder="password" />
            {pwdErr && <div className="password-error error">{pwdErr}</div>}
            <button>SUBMIT</button>
        </form>
    );
}

export default Signup;