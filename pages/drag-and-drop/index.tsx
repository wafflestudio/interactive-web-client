import {MouseEvent, MouseEventHandler, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'

import {getObjects} from '../../modules/objects'
import {setPosition} from '../../modules/position'

import styles from './DragAndDrop.module.scss'

export default function DragAndDrop() {
  const containerRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    // 마운트될때 div(container)에 속한 svg들을 리덕스(objects)에 저장
    const svgObjects = containerRef.current?.children
    svgObjects && dispatch(getObjects(svgObjects))
  }, [])

  const move: MouseEventHandler = (e) => {
    // mousemove 하는 동안 변화
    if ((e.target as SVGRectElement).parentElement) {
      // svg의 위치 변화
      ;(e.target as SVGRectElement).parentElement.style.position = 'absolute'
      ;(e.target as SVGRectElement).parentElement.style.left = `${e.pageX}px`
      ;(e.target as SVGRectElement).parentElement.style.top = `${e.pageY}px`
    }

    dispatch(
      // svg의 x, y 좌표 리덕스(position)에 저장
      setPosition({
        element: (e.target as SVGRectElement).parentElement,
        x: e.clientX,
        y: e.clientY
      })
    )
  }

  const onMouseDown: MouseEventHandler = (e) => {
    ;(e.target as SVGRectElement).addEventListener(
      'mousemove',
      (e: MouseEvent) => {
        move(e)
        // rect의 parentElement, 즉 svg의 position을 저장
      }
    )
  }

  const onMouseUp: MouseEventHandler = (e) => {
    ;(e.target as SVGRectElement).removeEventListener(
      'mousemove',
      (e: MouseEvent) => {
        move(e)
      }
    )
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <svg>
        <rect
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          width="50px"
          height="50px"
          fill="#5ae07e"
        />
      </svg>
      <svg>
        <rect
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          width="50px"
          height="50px"
          r="50px"
          fill="#e8dd68"
        />
      </svg>
      <svg>
        <rect
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          width="50px"
          height="50px"
          r="50px"
          fill="#857bed"
        />
      </svg>
    </div>
  )
}
