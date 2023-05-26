import React, { useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators.js";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import "./Register.css";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Register = () => {
  const register = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      firstname: {
        value: "",
        isValid: false,
      },
      lastname: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const registerSubmitHandler = async (event) => {
    event.preventDefault(); // to prevent the browser to submit the form and reloud the page

    try {
      const responseData = await sendRequest(
        "http://localhost:8000/api/users/signup",
        "POST",
        JSON.stringify({
          firstname: formState.inputs.firstname.value,
          lastname: formState.inputs.lastname.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-type": "application/json",
        }
      );
      register.login(responseData.userId, responseData.token);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="register">
        {isLoading && <LoadingSpinner asOverly />}
        <h2>Register Required</h2>
        <hr />
        <form onSubmit={registerSubmitHandler}>
          <Input
            id="firstname"
            element="input"
            type="text"
            label="First Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid first name"
            onInput={inputHandler}
          />
          <Input
            id="lastname"
            element="input"
            type="text"
            label="Last Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid last name"
            onInput={inputHandler}
          />
          <Input
            id="email"
            element="input"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="text"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            SIGNUP
          </Button>
        </form>
        <Button to="/auth">SWITCH TO AUTHENTICATION</Button>
      </Card>
    </React.Fragment>
  );
};

export default Register;
