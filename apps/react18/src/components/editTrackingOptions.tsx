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
          <ButtonGroup className="tracking-options__buttons" aria-label={'Toggle deliveree visibility'}>
            {options.showDel.map((value, index) =>
              <Button
                key={index}
                variant={options.showDel[index] ? 'contained' : 'outlined'}
                className={options.showDel[index] ? 'contained' : 'outlined'}
                onClick={() => toggle(index)}
                aria-label={`Toggle Deliveree ${index + 1} visibility`}
              >
                {index + 1}
              </Button>
            )}
          </ButtonGroup>
        </div>
      )}

      <div className="tracking-options__container">
        <label>Pizzas Min</label>
        <Slider
          className={'tracking-options__slider'}
          aria-label="Minimum Pizzas delivered to location"
          value={options.pizzas}
          valueLabelDisplay={'on'}
          min={1}
          max={options.pmax}
          onChange={(ev, pizzas) => onChangeOptions({...options, pizzas: pizzas as number}) } />
      </div>

      <div className="tracking-options__container">
        <label>Orders Range</label>
        <Slider
          className={'tracking-options__slider'}
          getAriaLabel={() => 'Orders range visibility'}
          value={[options.start, options.end]}
          valueLabelDisplay={'on'}
          min={0}
          max={options.max}
          onChange={(ev, values) => {
            const [start, end] = values as number[];
            onChangeOptions({...options, start, end});
          }}
        />
      </div>
    </div>
  )
}
