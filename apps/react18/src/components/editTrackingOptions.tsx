import {Button, ButtonGroup, Slider} from '@mui/material';
import {TrackingOptions} from '../pizza-delivery';

export type EditTrackingOptionsProps = {
  options: TrackingOptions
  onChangeOptions: (options: TrackingOptions) => void
};

export default function EditTrackingOptions({options, onChangeOptions}: EditTrackingOptionsProps) {
  const toggle = (index: number) => {
    options.showDel[index] = !options.showDel[index];
    onChangeOptions({...options});
  }

  return (
    <div className={'tracking-options'}>
      {options.deliverees > 1 && (
        <div className="tracking-options__container">
          <label>Deliverees</label>
          <ButtonGroup aria-label={''}>
            {options.showDel.map((value, index) =>
              <Button variant={options.showDel[index] ? 'contained' : 'outlined'} onClick={() => toggle(index)}>{index + 1}</Button>
            )}
          </ButtonGroup>
        </div>
      )}

      <div className="tracking-options__container">
        <label>Pizzas Min</label>
        <Slider
          aria-label="Minimum Pizzas delivered to location"
          value={options.pizzas}
          valueLabelDisplay={'on'}
          min={1}
          max={options.pmax}
          marks
          onChange={(ev, pizzas) => onChangeOptions({...options, pizzas: pizzas as number}) } />
      </div>

      <div className="tracking-options__container">
        <label>Orders Range</label>
        <Slider
          aria-label="Orders range"
          value={[options.start, options.end]}
          valueLabelDisplay={'on'}
          min={1}
          max={options.max}
          marks
          onChange={(ev, values) => {
            const [start, end] = values as number[];
            onChangeOptions({...options, start, end});
          }}
        />
      </div>
    </div>
  )
}
