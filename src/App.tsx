import { useRef, useState } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import Home from "./components/Home";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState<string>(cookies.get("auth-token")); //Used to check if user has signed in with google
  const [isRoom, setRoom] = useState<string | null>(""); // Chech if user has Entered a Chat Room

  const roomInputRef = useRef<HTMLInputElement | null>(null); //ref was used to track input so it can be updated using a button

  if (!isAuth) {
    return (
      <>
        <div className="bg-[#F4E1C1] min-h-[100vh]">
          {/* Auth Components takes care of Google Pop Up Authorization (passed setIsAuth as a prop to change the page when user signs in) */}
          <Auth setIsAuth={setIsAuth} />
        </div>
      </>
    );
  }

  return (
    <div className="bg-[#F4E1C1] min-h-[100vh] py-12">
      {/* Condition to check if user is in a Chat Room */}
      {isRoom != "" ? (
        <Chat room={isRoom} />
      ) : (
        <Home setRoom={(e) => setRoom(e)} roomInputRef={roomInputRef} />
      )}
    </div>
  );
}

export default App;
