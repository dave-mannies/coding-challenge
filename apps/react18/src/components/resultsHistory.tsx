import {Fab} from '@mui/material';
import {NavigateBefore, NavigateNext} from '@mui/icons-material';
import ResultsView from './resultsView';
import {Results} from '../pizza-delivery/types';
import {useEffect, useState} from 'react';

export type ResultsHistoryProps = {
  results: Results
  onSelected: (value: Results) => void
}

export default function ResultsHistory({results, onSelected}: ResultsHistoryProps) {
  const [index, setIndex] = useState(results.currentIndex);
  const max = results.history.length - 1;

  const nav = (dir: number) => {
    if (dir === -1) {
      if (index > 0) {
        setIndex(index - 1);
      }
    } else {
      if (index < max) {
        setIndex(index + 1);
      }
    }
  }

  useEffect(() => {
    onSelected({...results, currentIndex: index, current: results.history[index]});
  }, [index]);

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
        {results.current ? <ResultsView result={results.current} /> : <div>Empty History</div>}
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
