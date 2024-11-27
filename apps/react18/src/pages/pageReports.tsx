import {useContext, useState} from 'react';
import {DeliveryContext} from '../app/App';
import ResultsHistory from '../components/results-history';
import TrackingOptions from '../components/tracking-options';
import EntriesTable from '../components/entriesTable';
import {DeliveryResults, Results} from '../pizza-delivery/types';

export default function PageReports() {
  const deliveryService = useContext(DeliveryContext).deliveryService;
  const [results, setResults] = useState<Results>(deliveryService.results);

  const onSelected = (current: DeliveryResults, currentIndex: number) => {
    const newResults = {...results, current, currentIndex};
    setResults(newResults);
    deliveryService.results = newResults;
  };

  return (
    <div className={'reports'}>
      <ResultsHistory history={results.history} defaultIndex={results.currentIndex} onSelected={onSelected} />

      <TrackingOptions />

      <EntriesTable entries={results.current?.analysis?.[0].entries ?? []} />
    </div>
  )
}
