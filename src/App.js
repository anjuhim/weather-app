import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button } from 'react-bootstrap';

// 1. 앱이 시작 되자마자 현재위치 기반의 날씨가 보인다/
// 2. 날씨정보에는 도시, 섭씨, 화씨 날씨상태
// 3. 5개의 버튼이 있다. (1.현재위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭할 떄마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoding] = useState(false);
  const [apiError, setAPIError] = useState('');
  const cities = [
    'seoul',
    'incheon',
    'daejeon',
    'gwangju',
    'daegu',
    'ulsan',
    'busan',
    'jeju',
  ];
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lang=kr&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP}`;

  const getWeatherByCurrentLocation = (lat, lon) => {
    let url = `${weatherApiUrl}&lat=${lat}&lon=${lon}`;
    callWeather(url);
  };

  const getWeatherByCity = () => {
    let url = `${weatherApiUrl}&q=${city}`;
    callWeather(url);
  };

  const callWeather = async (url) => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoding(false);
    } catch (e) {
      console.log('ERROR:', e);
      setAPIError(e.message);
      setLoding(false);
    }
  };

  const getCurrentLocation = () => {
    setLoding(true);
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  useEffect(() => {
    setLoding(true);
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <div className="container">
      {loading ? (
        <ClipLoader
          color={'purple'}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : !apiError ? (
        <>
          <Button variant="link" onClick={() => setCity('')}>
            ○ 현위치
          </Button>
          <div className="both">
            <div className="left">
              <WeatherBox weather={weather} />
            </div>
            <div className="right">
              <WeatherButton cities={cities} setCity={setCity} city={city} />
            </div>
          </div>
        </>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
