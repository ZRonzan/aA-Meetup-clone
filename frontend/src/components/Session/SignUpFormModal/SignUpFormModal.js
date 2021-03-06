import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { userSignUp } from "../../../store/session"
import "./UserSignUpFormModal.css"

export default function UserSignUpPage({ setShowModal }) {
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
            history.push("/")
        } else {
            setResponse(res)
        }

    }

    useEffect(() => {
        setResponse("")
    }, [firstName, lastName, email, password, passwordConfirmation])

    return (
        <>
            <div className="signup-form-container">
                <form
                    onSubmit={handleSubmit}
                    className="signup-form"
                >
                    <div className="signup-form-cross signup" onClick={() => setShowModal(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="signup-form">
                        <h2>Sign up</h2>
                    </div>
                    <label className="signup-form">First Name:
                        <input
                            required
                            className="signup-form"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                        >
                        </input>
                    </label>
                    <label className="signup-form">Last Name:
                        <input
                            required
                            className="signup-form"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                        >
                        </input>
                    </label>
                    <label className="signup-form">Email:
                        <input
                            required
                            className="signup-form"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        >
                        </input>
                    </label>
                    <label className="signup-form">Password:
                        <input
                            required
                            className="signup-form"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        >
                        </input>
                    </label>
                    <label className="signup-form">Password Confirmation:
                        <input
                            required
                            className="signup-form"
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
                    {response && (
                        <>
                            {response.message === "Validation error" && (
                                <>
                                    <ul className="signup-form">
                                        <h3>Sign up validation errors:</h3>
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
                                    <h4>Sign up email error:</h4>
                                    <ul className="signup-form">
                                        <li>{Object.values(response.errors.email)}</li>
                                    </ul>
                                </>
                            )}
                        </>
                    )}
                </form>
            </div>
        </>
    )
}
