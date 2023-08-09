// import InputField from "../../Assets/InputField";
import Button from "../../Assets/Button";
import "./login.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserProfile,
} from "firebase/auth";
import { FormControl } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { auth, db, storage } from "../../Firebase/firebaseConfig";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik, ErrorMessage } from "formik";
import InputField from "../../Assets/InputField";
import toast, { Toaster } from "react-hot-toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  // initial vales for form
  const initialValues = {
    file: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
  //yup form Validation
  const FormValues = Yup.object().shape({
    file: Yup.string().required("file"),
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(1, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),

    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile no is required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  // const [data, setData] = useState({ user: "", password: "" });
  // const handleLogin = (value, InputField) => {
  //     setData((prevState) => ({
  //         ...prevState,
  //         [InputField]: value,
  //     }));
  // };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = async (values) => {
    const displayName = `${values.firstName} ${values.lastName}`;
    const file = values.file;
    const phoneNumber = values.phoneNumber;

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      toast.success("Signed Up ✅");
      console.log("😎", res.user);
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask?.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (parseInt(snapshot.bytesTransferred) /
              parseInt(snapshot.totalBytes)) *
            100;
          console.log(
            "Upload is " + progress + "% done",
            snapshot.bytesTransferred,
            snapshot.totalBytes
          );
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running", progress);
              break;
          }
        },
        (error) => {
          console.log("Handle unsuccessful uploads", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(res.user, {
              displayName,
              phoneNumber,
              photoURL: downloadURL,
            });
            const docRef = await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email: values.email,
              phoneNumber,
              photoURL: downloadURL,
              status: false,
              lastSeen: serverTimestamp(),
            });
            // console.log("Document written with ID: ", docRef.id);
          });
        }
      );
    } catch (error) {
      console.log("🔴photo fail", error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FormValues}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="main-container" style={{ color: "white" }}>
          <div className="container">
            <div className="heading">
              <h2 className="heading-text">Sign Up</h2>
            </div>
            <div className="char">
              <InputField
                type="file"
                id="myfile"
                name="file"
                // value={formikProps.values.file}
                onChange={(event) => {
                  console.log("🤐", event.target.files[0]);
                  formikProps.setFieldValue("file", event.target.files[0]);
                }}
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="input-filed">
                  <TextField
                    sx={{ color: "white" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                    value={formikProps.values.firstName}
                    onChange={formikProps.handleChange("firstName")}
                  />
                  <div className="input-error">
                    <ErrorMessage
                      component="small"
                      className="error"
                      name="firstName"
                    />
                  </div>
                </div>
                <div className="input-filed">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    value={formikProps.values.lastName}
                    onChange={formikProps.handleChange("lastName")}
                  />
                  <div className="input-error">
                    <ErrorMessage
                      className="error"
                      name="lastName"
                      component="small"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="input-filed">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    value={formikProps.values.email}
                    onChange={formikProps.handleChange("email")}
                  />
                  <div className="input-error">
                    <ErrorMessage
                      name="email"
                      component="small"
                      className="error"
                    />
                  </div>
                </div>
                <div className="input-filed">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="phoneNumber"
                    type="number"
                    label="Phone Number"
                    placeholder="Phone Number"
                    value={formikProps.values.phoneNumber}
                    onChange={formikProps.handleChange("phoneNumber")}
                  />
                  <div className="input-error">
                    <ErrorMessage
                      name="phoneNumber"
                      component="small"
                      className="error"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="input-filed">
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formikProps.values.password}
                      onChange={formikProps.handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>

                  <div className="input-error">
                    <ErrorMessage
                      className="error"
                      component="small"
                      name="password"
                    />
                  </div>
                </div>
                <div className="input-filed">
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-basic"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formikProps.values.confirmPassword}
                      onChange={formikProps.handleChange("confirmPassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <div className="input-error">
                    <ErrorMessage
                      component="small"
                      className="error"
                      name="confirmPassword"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="forget">
              <p>
                Already had an account..?
                <Link className="sign-up" to="/login">
                  {" "}
                  Log In
                </Link>
              </p>
            </div>
            <div className="action">
              <Toaster />
              <Button className="signup-btn" type="submit">
                Sign Up
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default SignUp;
