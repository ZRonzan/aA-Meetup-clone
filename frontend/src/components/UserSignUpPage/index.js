import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { userSignUp } from "../../store/session"
import "./UserSignUpPage.css"

export default function UserSignUpPage() {
    const dispatch = useDispatch()
    const history = useHistory()

    //check to see if a user is already logged in and redirect if so
    const user = useSelector(state => state.session.user)

    if (user) {
        history.push("/")
    }

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const [response, setResponse] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            firstName,
            lastName,
            email,
            password
        }

        let res = await dispatch(userSignUp(user));
        if (!res.message) {
            setResponse("")
            history.push("/")
            setPassword("");
            setEmail("");
        } else {
            setResponse(res)
        }

    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="signup-form"
            >
                <label className="signup-form">First Name:
                    <input
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                    >
                    </input>
                </label>
                <label className="signup-form">Last Name:
                    <input
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                    >
                    </input>
                </label>
                <label className="signup-form">Email:
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    >
                    </input>
                </label>
                <label className="signup-form">Password:
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    >
                    </input>
                </label>
                <label className="signup-form">Password Confirmation:
                    <input
                        type="password"
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        value={passwordConfirmation}
                    >
                    </input>
                </label>
                <div>
                    {!(password === passwordConfirmation) && (
                        <text>Passwords do not match</text>
                    )}
                </div>
                <button disabled={password !== passwordConfirmation} className="signup-form">Sign Up</button>
            </form>
            {response && (
                <>
                    {response.message === "Validation error" && (
                        <>
                            <h4>{response.message}</h4>
                            <ul className="signup-form">
                                {response.errors && (
                                    response.errors.map((message, i) => {
                                        return (<li key={i}>{Object.values(message)}</li>)
                                    })
                                )}
                            </ul>
                        </>
                    )}
                    {response.message === "User already exists" && (
                        <>
                            <h4>{response.message}</h4>
                            <ul className="signup-form">
                                <li>{Object.values(response.errors.email)}</li>
                            </ul>
                        </>
                    )}
                </>
            )}
        </>
    )
}
