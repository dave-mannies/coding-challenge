import {useNavResults} from '../hooks/useNavResults';
import ResultsHistory from '../components/resultsHistory';
import EditTrackingOptions from '../components/editTrackingOptions';

export default function PageTracking() {
  const {index, results, entries, onNav, options, onChangeOptions} = useNavResults();

  return (
    <div className={'reports'}>
      <ResultsHistory results={results} onNav={onNav} index={index}/>

      <EditTrackingOptions options={options} onChangeOptions={onChangeOptions}/>

      <div>{JSON.stringify(options, null, 2)}</div>

      <div>{entries.filter((e) => e.hide === true).length}</div>


      <div>Tracking {entries.length}</div>
    </div>
  )
}
