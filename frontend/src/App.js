import LogInFormPage from "./components/LogInFormPage";
import UserSignUpPage from "./components/UserSignUpPage";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { restoreUserSession } from "./store/session";
import Navigation from "./components/Navigation";

function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  //restore a logged in user on refresh
  useEffect(() => {
    dispatch(restoreUserSession())
  }, [])

  return (
    <>
      <h1>Meetups Clone</h1>

      <Navigation />
      <Switch>
        <Route path="/login">
          <LogInFormPage />
        </Route>
        <Route path="/signup">
          <UserSignUpPage />
        </Route>
      </Switch>
      {/* comment out or delete below later. this is testing to see the current logged in user */}
      {user !== null && (<div>
        <h3>Current user:</h3>
        <div>First name: {user.firstName}</div>
        <div>Last name: {user.lastName}</div>
        <div>email: {user.email}</div>
      </div>)}
    </>
  );
}

export default App;
