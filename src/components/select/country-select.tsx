'use client'

import React, { useState } from 'react';
import { Country, State, City } from 'country-state-city';

const CountryStateCitySelector = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  return (
    <div>
      <h2>Seleccione País, Estado y Ciudad</h2>
      {/* Selector de País */}
      <select onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="">Selecciona un país</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>

      {/* Selector de Estado */}
      {selectedCountry && (
        <select onChange={(e) => setSelectedState(e.target.value)}>
          <option value="">Selecciona un estado/provincia</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      )}

      {/* Selector de Ciudad */}
      {selectedState && (
        <select>
          <option value="">Selecciona una ciudad</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CountryStateCitySelector;
