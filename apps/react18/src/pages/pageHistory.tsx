import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import React, {useContext, useState} from 'react';
import {DeliveryContext} from '../app/App';
import Paper from '@mui/material/Paper';
import ResultsTable from '../components/resultsTable';
import ResultsView from '../components/resultsView';

export default function PageHistory() {
  const deliveryService = useContext(DeliveryContext).deliveryService;
  const [showCards, setShowCards] = useState(true);

  return (
    <div className="history compressed">

      <ButtonGroup className={'history-buttons'} aria-label={'Basic button group'}>
        <Button variant={showCards ? 'contained' : 'outlined'} onClick={() => setShowCards(true)} data-testid={'cards'}>Cards</Button>
        <Button variant={!showCards ? 'contained' : 'outlined'} onClick={() => setShowCards(false)} data-testid={'table'}>Table</Button>
      </ButtonGroup>

      {showCards ? (
        <div className={'results'}>
          {deliveryService.results.history.map((r) => (
            <Card key={r.id}>
              <CardHeader title={`Results #${r.id}`} />
              <CardContent>
                <ResultsView result={r} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <ResultsTable history={deliveryService.results.history} />
      )}
    </div>
  )
}
