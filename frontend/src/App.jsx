import Home from "./pages/Home"


function App() {

  const handleButtonClick = () => {
    alert("Start your journey now!");
  };

  return (
    <>
      <Home />
      <div>
        <h1>Welcome to the Vehicle Rental System</h1>
        <p>Choose a vehicle and start your journey today!</p>
        <button onClick={handleButtonClick}>Get Started</button>
      </div>
    </>
  );
}

export default App
