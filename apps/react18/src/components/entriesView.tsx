import React, {CSSProperties} from 'react';
import {Container, Fab} from '@mui/material';
import {Add, Remove} from '@mui/icons-material';
import {useScale} from '../hooks/useScale';
import {DeliveryEntry, TrackingAnalysis} from '../pizza-delivery/types';
import {TrackingOptions} from '../pizza-delivery';

export type EntriesViewProps = {
  options: TrackingOptions
  entries: DeliveryEntry[]
  analysis: TrackingAnalysis
};

export default function EntriesView({options, entries, analysis}: EntriesViewProps) {
  const {ref, scale, zoom} = useScale(analysis);

  return (
    <Container component={'div'} classes={{root: 'play'}} maxWidth={false}>
      <h3 className={'tracking--heading'}>
        Tracking {options.start}-{options.end} of {options.max}
        {scale.zoom > 1 && ` Zoom = ${scale.zoom}`}
      </h3>

      <div ref={ref} className="tracking__container">
        <div className="tracking" style={{
          '--zoom': scale.zoom,
          '--xoffset': scale.xoffset + scale.xpan,
          '--yoffset': scale.yoffset + scale.ypan,
          '--mult': scale.mult
        } as CSSProperties}>
          <span className="tracking__x-axis"></span>
          <span className="tracking__y-axis"></span>

          {entries.map((e, i) => (
            <span
              key={`${e.dId}-${e.order}`}
              className="tracking__entry"
              data-index={`${e.dId}-${e.order}`}
              data-hidden={e.hide ? 'true' : 'false'}
              data-x={e.x}
              data-y={e.y}
              data-pizzas={e.pizzas}
              data-did={e.dId}
              data-order={e.order}
              style={{'--left': e.x, '--top': (-1 * e.y!)} as CSSProperties}
            >&nbsp;</span>
          ))}
        </div>

        <div className="tracking__pan-zoom">
          <Fab
            size={'small'}
            aria-label={'Zoom In'}
            onClick={zoom(1)}
            disabled={scale.zoom >= 5}
            color={'info'}
          >
            <Add />
          </Fab>

          <Fab
            size={'small'}
            aria-label={'Zoom out'}
            onClick={zoom(-1)}
            disabled={scale.zoom <= 1}
            color={'info'}
          >
            <Remove />
          </Fab>
        </div>
      </div>
    </Container>
  )
}
