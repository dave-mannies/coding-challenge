import {useContext, useState} from 'react';
import {DeliveryContext} from '../app/App';
import {Results} from '../pizza-delivery/types';
import {TrackingOptions} from '../pizza-delivery';

export const useNavResults = () => {
  const deliveryService = useContext(DeliveryContext).deliveryService;
  const [index, setIndex] = useState(deliveryService.currentIndex);
  const [results] = useState<Results>(deliveryService.results);
  const [options, setOptions] = useState<TrackingOptions>(deliveryService.getTrackingOptions(deliveryService.currentIndex));
  const [entries, setEntries] = useState(deliveryService.getDeliveryTracking(index));
  const [analysis, setAnalysis] = useState(deliveryService.getDeliveryTrackingAnalysis(index));

  const onNav = (value: number) => {
    deliveryService.currentIndex = value;
    setIndex(value);
    setOptions(deliveryService.getTrackingOptions(value));
    setEntries(deliveryService.getDeliveryTracking(value));
    setAnalysis(deliveryService.getDeliveryTrackingAnalysis(value));
  };

  const onChangeOptions = (options: TrackingOptions) : void => {
    setOptions(options);
    deliveryService.filter(entries, options);
  }

  return {index, results, analysis, entries, onNav, options, onChangeOptions};
}
