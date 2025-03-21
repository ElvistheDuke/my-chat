import { Dispatch, RefObject, SetStateAction } from "react";

interface Props {
  roomInputRef: RefObject<HTMLInputElement | null>;
  setRoom: Dispatch<SetStateAction<string | null>>;
}

function Home(props: Props) {
  return (
    <div className="bg-white w-[70%] py-12 mx-auto flex flex-col justify-center items-center rounded-2xl">
      <div className="py-4 w-full flex flex-col justify-center items-center">
        <div className="flex">
          <h1 className="text-6xl font-bold text-[#3CAEA3]">Mushi</h1>
          <h1 className="text-6xl font-bold text-[#0A2463]">Com</h1>
        </div>
        <p className="text-2xl font-bold text-[#0A2463] italic">
          Talk Like a True Pirate
        </p>
      </div>
      <p className="text-3xl font-bold mt-8">Enter Island Name</p>
      <p className="text-sm italic mb-12">
        Island Name is the name of the Chat Room you would like to enter
      </p>
      <input
        className="bg-[gainsboro] w-[50%] h-8 px-4 text-xl"
        ref={props.roomInputRef}
      />
      <button
        className="border rounded-3xl bg-white px-6 py-2 mt-8 cursor-pointer font-bold hover:bg-[#0A2463] hover:text-white transition"
        onClick={() => {
          if (props.roomInputRef) {
            // const trimmedRoom = props.roomInputRef.current.value.trim();
            if (props.roomInputRef.current) {
              // updates the Room info with the ref hook
              console.log(props.roomInputRef.current.value);
              props.setRoom(props.roomInputRef.current.value);
            }
          }
        }}
      >
        Enter Chat
      </button>
    </div>
  );
}

export default Home;
