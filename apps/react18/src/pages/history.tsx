import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
  Divider,
  Paper,
  Button,
  ButtonGroup,
} from '@mui/material';
import React, {useContext, useState} from 'react';
import {DeliveryContext} from '../app/App';

export default function History() {
  const deliveryService = useContext(DeliveryContext);
  const [showCards, setShowCards] = useState(true);
  const cards = ['a', 'b'];

  return (
    <div className="history">
      <h1>{deliveryService.hello}</h1>

      <Paper elevation={2}>
        <ButtonGroup aria-label={'Basic button group'}  style={{width: '100%', justifyContent: 'end'}}>
          <Button variant={showCards ? 'contained' : 'outlined'} onClick={() => setShowCards(true)}>Cards</Button>
          <Button variant={!showCards ? 'contained' : 'outlined'} onClick={() => setShowCards(false)}>Table</Button>
        </ButtonGroup>
      </Paper>

      <Paper elevation={2}>
        {showCards && (
          <Stack spacing={2} direction="row" sx={{p: 2}}>
            {cards.map((t) => (
            <Card>
              <CardHeader title={t} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <Box>
                    <label>label:</label>
                    <span>a</span>
                  </Box>
                  This is a card
                </Typography>
              </CardContent>
            </Card>
            ))}
          </Stack>
        )}

        <Card>
          <CardHeader>

          </CardHeader>
          <CardContent>
            <Stack divider={<Divider/>} spacing="4">
              <Box>
                <Typography component={'h1'} textTransform="uppercase">
                  Summary
                </Typography>
                <Typography fontSize={2}>
                  View a summary of all your clients over the last month.
                </Typography>
              </Box>
              <Box>
                <Typography textTransform="uppercase">
                  Sales
                </Typography>
                <Typography pt="2" fontSize="2">
                  View a summary of all your clients over the last month.
                </Typography>
              </Box>
              <Box>
                <Typography textTransform="uppercase">
                  Other
                </Typography>
                <Typography fontSize="2">
                  View a summary of all your clients over the last month.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Paper>
    </div>
  )
}
