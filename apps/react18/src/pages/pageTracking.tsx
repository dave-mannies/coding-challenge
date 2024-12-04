import {useNavResults} from '../hooks/useNavResults';
import ResultsHistory from '../components/resultsHistory';
import EditTrackingOptions from '../components/editTrackingOptions';
import EntriesView from '../components/entriesView';

export default function PageTracking() {
  const {index, results, analysis, entries, onNav, options, onChangeOptions} = useNavResults();

  return (
    <div className={'reports'}>
      <ResultsHistory results={results} onNav={onNav} index={index} />

      <EditTrackingOptions options={options} onChangeOptions={onChangeOptions} />

      {analysis && <EntriesView analysis={analysis} entries={entries} />}
    </div>
  )
}
