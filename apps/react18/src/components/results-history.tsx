import {Fab} from '@mui/material';
import {NavigateBefore, NavigateNext} from '@mui/icons-material';
import {DeliveryResults} from '../pizza-delivery/types';
import Results from './results';
import {useEffect, useState} from 'react';

export type ResultsHistoryProps = {
  defaultIndex?: number
  history: DeliveryResults[]
  onSelected: (value: DeliveryResults, index: number) => void
}

export default function ResultsHistory({defaultIndex = 0, history, onSelected}: ResultsHistoryProps) {
  const [index, setIndex] = useState(defaultIndex);
  const max = history.length - 1;

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
    onSelected(history?.[index], index);
  }, [index]);

  return (
    <div className={'results-history'}>
      <h1>{index}</h1>

      <Fab
        size={'small'}
        disabled={index === 0}
        onClick={() => nav(-1)}
        aria-label={'Show Previous Results'}
      >
        <NavigateBefore/>
      </Fab>

      <div className={'results-history__history compressed'}>
        <Results result={history?.[index]}/>
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
