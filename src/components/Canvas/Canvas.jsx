import React, { memo, useEffect, useRef } from 'react'
import cls from './Canvas.module.css'

export const Canvas = memo((props) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        const image = new Image();
        image.crossOrigin = `Anonymous`;
        image.src = props.src;
        image.onload = () => {
            context.drawImage(image, 0, 0);
            image.style.display = "none";
            const getPixelData = (event) => {
                const x = event.offsetX;
                const y = event.offsetY;
                const pixel = context.getImageData(x, y, 1, 1);
                const data = pixel.data;
                const rgba =
                  "rgba(" +
                  data[0] +
                  ", " +
                  data[1] +
                  ", " +
                  data[2] +
                  ", " +
                  data[3] / 255 +
                  ")";
                  return{x,y,rgba}
            }
            const onEvent = (event,word) => {
                const result = getPixelData(event);
                word === 'click' ? props.setSelected(result) : props.setData(result);
            }
        const move = canvas.addEventListener("mousemove", event => onEvent(event,'hover'));
        const click = canvas.addEventListener("click", event => onEvent(event,'click'));
        return () => {
            canvas.removeEventListener(move);
            canvas.removeEventListener(click)
        }
  };
    }, [props]);

    return <div className={cls.container}>
            <canvas ref={canvasRef} className={cls.canvas} width={props.width} height={props.height}/>
        </div>
});
