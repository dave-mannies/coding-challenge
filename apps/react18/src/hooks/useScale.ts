import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ScalingResults, TrackingAnalysis} from '../pizza-delivery/types';
import {Grid} from '../pizza-delivery';

export const useScale = (analysis: TrackingAnalysis) => {
  const ref = useRef(null);
  const [scale, setScale] = useState<ScalingResults>({ xoffset: 0, yoffset: 0, mult: 10, zoom: 1, xpan: 0, ypan: 0});
  const scaleRef = useRef(scale);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale])

  useEffect(() => {
    calcScale();
  }, [analysis]);

  useLayoutEffect(() => {
    calcScale();
  }, []);

  // panning keyboard event handling when zoom is not 1
  useEffect(() => {
    const handleKeyPress = (ev: KeyboardEvent) => {
      const offset = 20;
      const updating = {...scaleRef.current};

      // ignore panning when not zoomed in
      if (updating.zoom === 1) {
        return;
      }

      switch(ev.key) {
        case 'ArrowLeft':
          setScale({...updating, xpan: updating.xpan - offset});
          break;

        case 'ArrowRight':
          setScale({...updating, xpan: updating.xpan + offset});
          break;

        case 'ArrowUp':
          setScale({...updating, ypan: updating.ypan - offset});
          break;

        case 'ArrowDown':
          setScale({...updating, ypan: updating.ypan + offset});
          break;
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [])

  const calcScale = () => {
    // @ts-ignore todo current type
    const { width, height } = ref.current!.getBoundingClientRect();
    const maxMult = 25;
    const scale = Grid.getFit(analysis, width, height, maxMult);
    setScale(scale);
  }

  const zoom = (dir: number) => () => {
    const zoom = scale.zoom + dir;

    setScale({
      ...scale,
      zoom: Math.max(1, zoom),
      xpan: zoom === 1 ? 0 : scale.xpan,
      ypan: zoom === 1 ? 0 : scale.ypan
    });
  }

  return { ref, scale, zoom };
}
