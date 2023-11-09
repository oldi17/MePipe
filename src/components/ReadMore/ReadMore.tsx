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
  const symbolsNum = props.symbolsNum || 2
  const linesNum = props.linesNum || 2
  
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
  
  return (
    <p 
      className={props.className}
      onClick={!props.state ? () => setIsReadMore(prev => !prev) : () => ''}
    >
      {isReadMore ? props.children : getContent()} 
      {props.children.length > symbolsNum && 
      <b>{isReadMore ? '...меньше' : '...еще'}</b>}
    </p>
  )
}