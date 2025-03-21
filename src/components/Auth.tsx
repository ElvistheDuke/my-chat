import { auth, provider } from "../firebase-config.ts";
import { signInWithPopup } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

import Cookies from "universal-cookie";

const cookies = new Cookies();

interface Props {
  // I need research this data type,(ChatGPT)
  setIsAuth: Dispatch<SetStateAction<string>>;
}

function Auth(props: Props) {
  //Function For Signing in with Google Pop Up
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); //Await because the function is async
      cookies.set("auth-token", result.user.refreshToken); // uses the universal cookies library
      props.setIsAuth(result.user.refreshToken); // Makes the page change after google sign in
      // console.log(result);
      return;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="w-full h-[90vh] flex flex-col gap-4 justify-center items-center">
          <div className="py-4 w-full flex flex-col justify-center items-center">
            <div className="flex">
              <h1 className="text-6xl font-bold text-[#3CAEA3]">Mushi</h1>
              <h1 className="text-6xl font-bold text-[#0A2463]">Com</h1>
            </div>
            <p className="text-2xl font-bold text-[#0A2463] italic">
              Talk Like a True Pirate
            </p>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-3xl">
              Start Chat rooms <br />
              with your friends and family
            </p>
          </div>
          {/* <p>Sign in with Google</p> */}
          {/* Calls the Sign In With Google Pop Up Function */}
          {/* <button onClick={signInWithGoogle}>Sign In</button> */}
          <div
            className="border rounded-2xl bg-white px-6 py-2 mt-8 cursor-pointer font-bold hover:bg-[#0A2463] hover:text-white transition"
            onClick={signInWithGoogle}
          >
            <p>Sign In With Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
