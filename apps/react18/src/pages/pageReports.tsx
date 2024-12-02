import ResultsHistory from '../components/resultsHistory';
import TrackingOptions from '../components/tracking-options';
import EntriesTable from '../components/entriesTable';
import {useNavResults} from '../hooks/useNavResults';

export default function PageReports() {
  const {index, results, entries, onNav} = useNavResults();

  return (
    <div className={'reports'}>
      <ResultsHistory results={results} onNav={onNav} index={index} />

      <TrackingOptions />

      <EntriesTable entries={entries} />
    </div>
  )
}
