import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div>
      <Button variant="outline-primary">Current Location</Button>{' '}
      <Button variant="outline-primary">Paris</Button>{' '}
      <Button variant="outline-primary">Seoul</Button>{' '}
      <Button variant="outline-primary">NewYork</Button>{' '}
    </div>
  );
};

export default WeatherButton;
