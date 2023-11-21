import { ImageUpload } from "./home";

function App() {
  // return <ImageUpload />;
  return(
    <>
    <div className="fixed flex w-screen h-32 items-center text-indigo text-xl font-helvetica">
      
      <div className="flex w-full h-16 justify-center items-center"><div className="flex h-full w-3/4 justify-center items-center">DISEASES</div></div>
      <div className="flex w-full h-16 justify-center items-center"><div className="flex h-full w-3/4 justify-center items-center">CURES</div></div>
      <div className="flex w-full h-16 justify-center items-center"><div className="flex h-full w-3/4 justify-center items-center">HOW TO USE</div></div>
      <div className="flex w-full h-16 justify-center items-center"><div className="flex h-full w-3/4 justify-center items-center">HELP US IMPROVE</div></div>
      <div className="flex w-full h-16 justify-center items-center"></div>
      <div className="flex w-full h-16 justify-center items-center"></div>
      <div className="flex w-full h-16 justify-center items-center"></div>
    </div>
    <div className="flex pt-20 h-screen w-screen bg-slate font-helvetica items-center justify-center">
      <div className="relative flex h-4/5 w-3/5 items-center justify-end">
        <div className="peer flex border-2 border-black
        h-3/4 w-3/4 absolute -translate-x-5 -translate-y-5
        hover:translate-x-0 hover:translate-y-0 duration-300 ease-out
        text-neutral text-9xl"></div>
        <div className="peer-hover:bg-neutral peer-hover:text-emerald duration-300 ease-in flex px-5 py-y bg-indigo h-3/4 w-3/4 text-neutral text-9xl">
          Tomato Leaf Disease Detection
        </div>
      </div>
      <div className="py-20 pr-36 pl-2 text-indigo h-4/5 w-2/5 text-7xl">
        A better way to spot diseases for tomatoes
        <div>
        <button  className=" h-20 w-32 text-xl text-neutral text-center
        bg-indigo
        hover:bg-neutral hover:text-indigo duration-300" >
          Get Started</button>
        </div>
      </div>
      
    </div>
    </>
  );

}

export default App;
