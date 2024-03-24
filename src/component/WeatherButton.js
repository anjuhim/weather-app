import React from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, city }) => {
  return (
    <div className="buttonWrap">
      <ButtonGroup vertical="true">
        <Button
          variant={city === '' ? 'danger' : 'outline-primary'}
          onClick={() => setCity('')}
        >
          ○ 현위치
        </Button>
        {cities.map((item, index) => {
          return (
            <ToggleButton
              type="radio"
              key={index}
              id={`city-${index}`}
              name="city"
              value={item}
              checked={city === item}
              variant={city === item ? 'danger' : 'outline-primary'}
              onChange={(e) => setCity(e.currentTarget.value)}
            >
              {item}
            </ToggleButton>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

export default WeatherButton;
