import React, {useEffect, useRef, useState} from 'react'

import {setFillColor, setStrokeColor} from '../store/colorSlice'
import {useAppDispatch, useAppSelector} from '../store/hooks'

export default function Draw() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D>()
  const [isDrawing, setIsDrawing] = useState(false)

  const {fill, stroke} = useAppSelector((state) => state.color)

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.fillStyle = fill
        context.strokeStyle = stroke
        context.lineWidth = 5
        contextRef.current = context
      }
    }
  }, [fill, stroke])

  const dispatch = useAppDispatch()

  const onFillChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch(setFillColor(e.target.value))

  const onStrokeChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch(setStrokeColor(e.target.value))

  const startDrawing: React.MouseEventHandler<HTMLCanvasElement> = ({
    nativeEvent
  }) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current?.beginPath()
    contextRef.current?.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current?.fill()
    contextRef.current?.closePath()
    setIsDrawing(false)
  }

  const draw: React.MouseEventHandler<HTMLCanvasElement> = ({nativeEvent}) => {
    if (!isDrawing) return
    const {offsetX, offsetY} = nativeEvent
    contextRef.current?.lineTo(offsetX, offsetY)
    contextRef.current?.stroke()
  }

  return (
    <>
      <label htmlFor={'fill'}>
        fill
        <input
          id={'fill'}
          type={'color'}
          value={fill}
          onChange={onFillChange}
        />
      </label>
      <label htmlFor={'stroke'}>
        stroke
        <input
          id={'stroke'}
          type={'color'}
          value={stroke}
          onChange={onStrokeChange}
        />
      </label>
      <canvas
        ref={canvasRef}
        width={'600px'}
        height={'600px'}
        style={{border: '1px solid black'}}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </>
  )
}
