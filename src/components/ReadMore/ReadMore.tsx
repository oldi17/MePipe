import { useState } from 'react';
import './ReadMore.css'

export default function ReadMore(props: {
  className: string;
  children: string;
  state?: [
    isReadMore: boolean,
    setIsReadMore: React.Dispatch<React.SetStateAction<boolean>>,
  ];
  symbolsNum?: number;
  linesNum?: number;
}) {
  const [isReadMore, setIsReadMore] = props.state || useState(false)
  const symbolsNum = props.symbolsNum || 150
  const linesNum = props.linesNum || 2
  const isReadMoreable = props.children.length > symbolsNum 
    || props.children.split('\n').length > linesNum
  
  function getContent() {
    const lines = props.children.split('\n')
    if (lines.length > linesNum) {
      return lines.slice(0, linesNum).join('\n')
    }
    if (props.children.length > symbolsNum) {
      return props.children.slice(0, symbolsNum)
    }
    return props.children
  }

  function handleMore() {
    if (!isReadMoreable || props.state || isReadMore) {
      return
    }
    setIsReadMore(true)
  }

  function handleLess() {
    if (!isReadMoreable || !isReadMore) {
      return
    }
    setIsReadMore(false)
  }
  
  return (
    <p 
      className={props.className}
    >
      {isReadMore ? props.children : getContent()} 
      {isReadMoreable && (!isReadMore 
      ? <b onClick={handleMore}>{'\n'}...еще</b>
      : <b onClick={handleLess}>{'\n'}Свернуть</b>)}
    </p>
  )
}