import { Location } from 'react-router-dom';

export const extractURLParam = (location: Location, requiredField: string) => {
  return new URLSearchParams(location.search).get(requiredField);
};
