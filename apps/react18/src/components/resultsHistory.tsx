import {Fab} from '@mui/material';
import {NavigateBefore, NavigateNext} from '@mui/icons-material';
import ResultsView from './resultsView';
import {Results} from '../pizza-delivery/types';

export type ResultsHistoryProps = {
  index: number
  results: Results
  onNav: (index: number) => void
}

export default function ResultsHistory({index, results, onNav}: ResultsHistoryProps) {
  const max = results.history.length - 1;

  const nav = (dir: number) => {
    if (dir === -1) {
      if (index > 0) {
        onNav(index - 1);
      }
    } else {
      if (index < max) {
        onNav(index + 1);
      }
    }
  }

  return (
    <div className={'results-history'}>
      <Fab
        size={'small'}
        disabled={index === 0}
        onClick={() => nav(-1)}
        aria-label={'Show Previous Results'}
      >
        <NavigateBefore/>
      </Fab>

      <div className={'results-history__history compressed'}>
        <div className={'results'}>
          {results.history[index] ? <ResultsView result={results.history[index]} /> : <div>Empty History</div>}
        </div>
      </div>

      <Fab
        size={'small'}
        disabled={index === max}
        onClick={() => nav(1)}
        aria-label={'Show Next Results'}
      >
        <NavigateNext/>
      </Fab>
    </div>
  )
}
