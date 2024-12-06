import ResultsHistory from '../components/resultsHistory';
import EditTrackingOptions from '../components/editTrackingOptions';
import EntriesTable from '../components/entriesTable';
import {useNavResults} from '../hooks/useNavResults';

export default function PageReports() {
  const {index, results, entries, onNav, options, onChangeOptions} = useNavResults();

  return (
    <>
      <ResultsHistory results={results} onNav={onNav} index={index} />

      <EditTrackingOptions options={options} onChangeOptions={onChangeOptions} />

      <EntriesTable entries={entries} />
    </>
  )
}
