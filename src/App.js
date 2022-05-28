import Country from "./components/Country/Country";
import Header from "./components/Header/Header";
import HOC from "./Hoc";
import CountriesData from "./components/MostCases/MostCases";
import ContinentsData from "./components/Continents/Continents";
import "./App.css";
import SortByCountry from "./components/SortByCountry/SortByCountry";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Country />
      <SortByCountry />
      <div className="numbers">
        <CountriesData />
        <ContinentsData />
      </div>
      <Footer />
    </div>
  );
}

App = HOC(App);
export default App;
