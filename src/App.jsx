import Auth from "./Components/Auth";
import Games from "./Components/Games";



function App() {
  return (
    <>
      <div className="flex justify-center">
        <h1 className="w-[45rem] rounded-md p-1 my-8 text-center text-5xl font-bold text-stone-200 bg-slate-500 hover:bg-slate-950">FireBase Starter</h1>
      </div>

      <Auth />
      <Games />

    </>
  );
}

export default App;
