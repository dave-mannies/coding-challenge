import {useNavResults} from '../hooks/useNavResults';
import ResultsHistory from '../components/resultsHistory';
import TrackingOptions from '../components/tracking-options';

export default function PageTracking() {
  const {index, results, entries, onNav} = useNavResults();

  return (
    <div className={'reports'}>
      <ResultsHistory results={results} onNav={onNav} index={index}/>

      <TrackingOptions/>

      <div>Tracking {entries.length}</div>
    </div>
  )
}
