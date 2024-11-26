import {
  Stack,
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
import Results from '../components/results';

export default function PageHistory() {
  const deliveryService = useContext(DeliveryContext).deliveryService;
  const [showCards, setShowCards] = useState(true);

  return (
    <div className="history">
      <Paper elevation={2}>
        <ButtonGroup aria-label={'Basic button group'}  style={{width: '100%', justifyContent: 'end'}}>
          <Button variant={showCards ? 'contained' : 'outlined'} onClick={() => setShowCards(true)}>Cards</Button>
          <Button variant={!showCards ? 'contained' : 'outlined'} onClick={() => setShowCards(false)}>Table</Button>
        </ButtonGroup>
      </Paper>

      <Paper elevation={2}>
        {showCards ? (
          <Stack spacing={2} direction="row" sx={{p: 2}}>
            {deliveryService.results.history.map((r) => (
              <Card>
                <CardHeader title={`Results #${r.id}`} />
                <CardContent>
                  <Results key={r.id} result={r} />
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <ResultsTable history={deliveryService.results.history} />
        )}
      </Paper>
    </div>
  )
}
