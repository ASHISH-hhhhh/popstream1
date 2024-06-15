import React from "react";
import { useState } from "react";
import "../css_files/signup.css";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, doc, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import logo from "../assets/logo.png";
import ModalTwo from "../components/ModalTwo";

function SignUp() {
  const navigate = useNavigate();
  const [loginForm, setloginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showNote, setshowNote] = useState(true);
  const signUpEmailfunc = () => {
    setLoading(true);
    console.log(name, email, password, "Account created");
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created");
            setName("");
            setEmail("");
            setPassword("");
            setconfirmPassword("");
            createDoc(user);
            setLoading(false);
            navigate("/home");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Please Correctly confirm your password");
        setLoading(false);
      }
    } else {
      toast.error("Fill the Valid Credentials");
      setLoading(false);
    }
  };
  const createDoc = async (user) => {
    //make sure doc with the same uid doesn't exist
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("User Doc created");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("User Doc Already Exists");
    }
  };
  const loginEmailfunc = () => {
    setLoading(true);
    console.log(email, password);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          setLoading(false);
          toast.success("Logging In...");
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("Enter Valid Credentials");
      setLoading(false);
    }
  };
  const googleSignIn = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          createDoc(user);
          console.log("Google User>> :", user);
          setLoading(false);
          navigate("/home");
          toast.success("User Logged in");
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          toast.error(errorMessage);
          setLoading(false);

          // ...
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="auth-pDiv">
      {/* <img
        src={logo}
        alt="popstream1-logo"
        className="log-logo colored-image"
      /> */}
      {/* const [showNote, setshowNote] = useState(true); */}

      {showNote && <ModalTwo onClose={() => setshowNote(false)} />}

      {loginForm ? (
        // <div className="sign-up-from">
        //   {" "}
        //   <div className="name-log-input">
        //     <p className="color-label">Name </p>
        //     <input
        //       type="text"
        //       placeholder="Name"
        //       value={name}
        //       onChange={(e) => setName(e.target.value)}
        //       className="inp-log"
        //     />
        //   </div>
        //   <div className="email-log-input">
        //     <p className="color-label">Email </p>
        //     <input
        //       type="email"
        //       placeholder="example@gmail.com"
        //       value={email}
        //       onChange={(e) => setEmail(e.target.value)}
        //       className="inp-log"
        //     />
        //   </div>
        //   <div className="pass-log-input">
        //     <p className="color-label">Password </p>
        //     <input
        //       type="password"
        //       value={password}
        //       onChange={(e) => setPassword(e.target.value)}
        //       className="inp-log"
        //     />
        //   </div>
        //   <div className="cPass-log-input">
        //     <p className="color-label">Confirm Password </p>
        //     <input
        //       type="password"
        //       value={confirmPassword}
        //       onChange={(e) => setconfirmPassword(e.target.value)}
        //       className="inp-log"
        //     />
        //   </div>
        //   <div className="log-btns">
        //     {" "}
        //     <button onClick={signUpEmailfunc} className="asal-btn">
        //       {loading ? "Loading..." : "Sign Up using Email and Password"}
        //     </button>
        //     <button onClick={googleSignIn} className="asal-btn">
        //       {loading ? "Loading..." : "Sign Up using Google"}
        //     </button>
        //   </div>
        //   <p className="loginFormPara" onClick={() => setloginForm(!loginForm)}>
        //     Already have an Account <span>Login</span>
        //   </p>
        // </div>
        <div className="login-from">
          <div>
            <p className="color-label">Email</p>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inp-log"
            />
          </div>
          <div>
            <p className="color-label">Password </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inp-log"
            />
          </div>
          <div className="log-btns">
            <button onClick={loginEmailfunc} className="asal-btn">
              Login using email and password
            </button>
          </div>
          <p className="loginFormPara" onClick={() => setloginForm(!loginForm)}>
            Don't have an Account <span>Sign Up</span>
          </p>
        </div>
      ) : (
        // <div className="login-from">
        //   <div>
        //     <p className="color-label">Email</p>
        //     <input
        //       type="email"
        //       placeholder="example@gmail.com"
        //       value={email}
        //       onChange={(e) => setEmail(e.target.value)}
        //       className="inp-log"
        //     />
        //   </div>
        //   <div>
        //     <p className="color-label">Password </p>
        //     <input
        //       type="password"
        //       value={password}
        //       onChange={(e) => setPassword(e.target.value)}
        //       className="inp-log"
        //     />
        //   </div>
        //   <div className="log-btns">
        //     <button onClick={loginEmailfunc} className="asal-btn">
        //       Login using email and password
        //     </button>
        //   </div>
        //   <p className="loginFormPara" onClick={() => setloginForm(!loginForm)}>
        //     Don't have an Account <span>Sign Up</span>
        //   </p>
        // </div>
        <div className="sign-up-from">
          {" "}
          <div className="name-log-input">
            <p className="color-label">Name </p>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inp-log"
            />
          </div>
          <div className="email-log-input">
            <p className="color-label">Email </p>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inp-log"
            />
          </div>
          <div className="pass-log-input">
            <p className="color-label">Password </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inp-log"
            />
          </div>
          <div className="cPass-log-input">
            <p className="color-label">Confirm Password </p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="inp-log"
            />
          </div>
          <div className="log-btns">
            {" "}
            <button onClick={signUpEmailfunc} className="asal-btn">
              {loading ? "Loading..." : "Sign Up using Email and Password"}
            </button>
            <button onClick={googleSignIn} className="asal-btn">
              {loading ? "Loading..." : "Sign Up using Google"}
            </button>
          </div>
          <p className="loginFormPara" onClick={() => setloginForm(!loginForm)}>
            Already have an Account <span>Login</span>
          </p>
        </div>
      )}
      <div className="test-log">
        Testing <b>LOGIN*</b> Id for Developers/Recruiters
        <p className="tacc">Email :- ashish@gmail.com</p>
        <p className="tacc">Password :- 123456789</p>
      </div>
    </div>
  );
}

export default SignUp;
