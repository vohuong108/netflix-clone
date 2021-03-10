import './App.css';
import Row from './components/Row';
import requests from './handleData/requests.js';
import Banner from './components/Banner.js';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Row 
        title="NETFLIX ORIGINALS" 
        fetchUrl={requests.fetchNetflixOriginals} 
        id_count='0'
        isLargeRow 
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending } id_count='1' />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated } id_count='2' />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies } id_count='3' />
      <Row title="Comendy Movies" fetchUrl={requests.fetchComendyMovies } id_count='4' />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies } id_count='5' />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies } id_count='6' />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries } id_count='7' />
    </div>
  );
}

export default App;
