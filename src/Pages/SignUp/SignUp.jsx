// import InputField from "../../Assets/InputField";
import Button from "../../Assets/Button";
import "./login.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserProfile,
} from "firebase/auth";
import { auth, db, storage } from "../../Firebase/firebaseConfig";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik, ErrorMessage } from "formik";
import InputField from "../../Assets/InputField";
import toast, { Toaster } from "react-hot-toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const SignUp = () => {
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

  const handleSubmit = async (values) => {
    const displayName = `${values.firstName} ${values.lastName}`;
    const file = values.file;
    const phoneNumber = values.phoneNumber;
    console.log("=====>>>>>>>>", file, values);
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
      await uploadTask?.on(
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
            });
            // console.log("Document written with ID: ", docRef.id);
          });
        }
      );
    } catch (error) {
      console.log("🔴photo fail", error);
    }
    // .then((userCredential) => {
    //     toast.success("Signed In ✅");
    // })
    // .catch((error) => {
    //     console.log(error);
    //     alert("User not found", error.code, "==>🙄", error.message)
    // });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FormValues}
      onSubmit={handleSubmit}
      // onSubmit={values => {
      //     debugger
      // Handle form submission
      //     alert(JSON.stringify(values));
      // }}
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
              {/* <img
                                className="musician imgg"
                                src={require("./image/rapper.png")}
                                alt=""
                            /> */}
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
                  <InputField
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
                  <InputField
                    name="lastName"
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
                  <InputField
                    name="email"
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
                  <InputField
                    name="phoneNumber"
                    type="number"
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
                  <InputField
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formikProps.values.password}
                    onChange={formikProps.handleChange("password")}
                  />
                  <div className="input-error">
                    <ErrorMessage
                      className="error"
                      component="small"
                      name="password"
                    />
                  </div>
                </div>
                <div className="input-filed">
                  <InputField
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formikProps.values.confirmPassword}
                    onChange={formikProps.handleChange("confirmPassword")}
                  />
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
