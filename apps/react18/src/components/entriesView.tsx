import React, {CSSProperties, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Paper from '@mui/material/Paper';
import {DeliveryEntry, ScalingResults, TrackingAnalysis} from '../pizza-delivery/types';
import {Container} from '@mui/material';
import {Grid} from '../pizza-delivery';

export type EntriesViewProps = {
  entries: DeliveryEntry[]
  analysis: TrackingAnalysis
};

export default function EntriesView({entries, analysis}: EntriesViewProps) {
  const ref = useRef(null);
  const [scale, setScale] = useState<ScalingResults>({ xoffset: 0, yoffset: 0, mult: 10, zoom: 1, xpan: 0, ypan: 0});

  useEffect(() => {
    calcScale();
  }, [analysis]);

  useLayoutEffect(() => {
    calcScale();
  }, []);

  const calcScale = () => {
    // @ts-ignore todo current type
    const { width, height } = ref.current!.getBoundingClientRect();
    const maxMult = 25;
    const scale = Grid.getFit(analysis, width, height, maxMult);
    setScale(scale);
  }

  return (
    <Container component={Paper} className={'play'}>
      <div ref={ref} className="tracking__container mat-elevation-z4">
        <div className="tracking" style={{
          '--zoom': scale.zoom,
          '--xoffset': scale.xoffset,
          '--yoffset': scale.yoffset,
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
      </div>
    </Container>
  )
}
