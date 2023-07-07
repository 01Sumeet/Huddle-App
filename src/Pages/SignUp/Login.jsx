import InputField from "../../Assets/InputField";
import Button from "../../Assets/Button";
import * as Yup from "yup";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebaseConfig";
import { Formik, Form, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
// import './login.scss'
const notify = (val) => toast(val);
const Login = () => {

const num = [1,2,4,5,6,3]
  const arr = ["a","c","d","b"]
const newArr = num.sort()
const newr = num.toSorted()
console.log("toSorted",newr)
console.log("I am sorted",newArr)
  const navigate = useNavigate();
  // const [data, setData] = useState({ user: "", password: "" });
  // const handleLogin = (value, field) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [field]: value,
  //   }));
  // };

  const initialValue = {
    email: "",
    password: "",
  };
  const FormValues = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const handleSubmit = (values) => {
    console.log("====>>>>>>>>>", values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        console.log(user.user);
        notify("Signed In ✅");
        const createLocalObject = {
          success: true,
          userInfo: user.user,
        };
        localStorage.setItem("userInfo", JSON.stringify(createLocalObject));
        navigate("/chat");
      })
      .catch((error) => {
        console.log(error);
        notify(error.auth);
      });
  };
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={FormValues}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <div className="main-container" style={{ color: "white" }}>
            <div className="container">
              <div className="heading">
                <h2 className="heading-text">Log In</h2>
              </div>
              <div className="char">
                <img
                  className="musician imgg"
                  src={require("./image/rapper.png")}
                  alt=""
                />
              </div>
              <div className="social-icons">
                <span className="icon">
                  <img
                    className="imgg"
                    src={require("./image/google (1).png")}
                    alt=""
                  />
                </span>
                <span className="icon">
                  <img
                    className="imgg"
                    src={require("./image/twitter.png")}
                    alt=""
                  />
                </span>
                <span className="icon">
                  <img
                    className="imgg"
                    src={require("./image/linkedin.png")}
                    alt=""
                  />
                </span>
                <span className="icon">
                  <img
                    className="imgg"
                    src={require("./image/snapchat (1).png")}
                    alt=""
                  />
                </span>
              </div>
              <div className="input-div">
                <InputField
                  name="email"
                  placeholder="Email or username"
                  value={formikProps.values.email}
                  onChange={formikProps.handleChange("email")}
                />{" "}
                <ErrorMessage
                  className="error"
                  component="small"
                  name="email"
                />
                <br />
                <InputField
                  name="password"
                  placeholder="Password"
                  value={formikProps.values.password}
                  onChange={formikProps.handleChange("password")}
                />
                <ErrorMessage
                  className="error"
                  component="small"
                  name="password"
                />
              </div>
              <div className="forget">
                <p>
                  Don't have an account ?
                  <Link className="sign-up" to="/signUp">
                    {" "}
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className="action">
                {/* <button onClick={}>Make me a toast</button> */}
                <Toaster />
                <Button className="signup-btn" text="Log In" type="submit" />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
