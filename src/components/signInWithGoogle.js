import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc, getDoc } from "firebase/firestore";

function SignInwithGoogle() {
  const navigate = useNavigate();

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        await setDoc(docRef, {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
        });
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userDetails = docSnap.data();
          localStorage.setItem("user", JSON.stringify(userDetails));
        }
        toast.success("User logged in successfully", {
          position: "top-center",
        });
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error during Google login:", error.message);
      toast.error("Failed to log in with Google. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p className="continue-p">-- Or continue with --</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={googleLogin}
      >
        <img src={require("../google.png")} alt="Google Sign-In" width="60%" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
