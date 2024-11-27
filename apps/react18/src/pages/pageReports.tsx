import {useContext, useState} from 'react';
import {DeliveryContext} from '../app/App';
import ResultsHistory from '../components/results-history';
import TrackingOptions from '../components/tracking-options';
import EntriesTable from '../components/entriesTable';
import {Results} from '../pizza-delivery/types';

export default function PageReports() {
  const deliveryService = useContext(DeliveryContext).deliveryService;
  const [results, setResults] = useState<Results>(deliveryService.results);

  const onSelected = (value: Results) => {
    setResults(value);
    deliveryService.results = value;
  };

  return (
    <div className={'reports'}>
      <ResultsHistory results={results} onSelected={onSelected} />

      <TrackingOptions />

      <EntriesTable entries={results.current?.analysis?.[0].entries ?? []} />
    </div>
  )
}
