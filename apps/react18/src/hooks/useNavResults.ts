import {useContext, useState} from 'react';
import {DeliveryContext} from '../app/App';
import {Results} from '../pizza-delivery/types';

export const useNavResults = () => {
  const deliveryService = useContext(DeliveryContext).deliveryService;
  const [index, setIndex] = useState(deliveryService.currentIndex);
  const [results] = useState<Results>(deliveryService.results);

  const onNav = (value: number) => {
    deliveryService.currentIndex = value;
    setIndex(value);
  };

  return {index, results, entries: deliveryService.getDeliveryTracking(index) , onNav};
}
