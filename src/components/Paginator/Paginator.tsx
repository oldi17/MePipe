import './Paginator.css'

export default function Paginator(props: {
  count: number;
  max: number;
  handleFirst: Function;
  handlePrev: Function;
  handleNext: Function;
  handleLast: Function;
}) {

  function handleFirst() {
    if (props.count === 1) {
      return
    }
    props.handleFirst()
  }

  function handlePrev() {
    if (props.count === 1) {
      return
    }
    props.handlePrev()
  }

  function handleNext() {
    if (props.count === props.max) {
      return
    }
    props.handleNext()
  }

  function handleLast() {
    if (props.count === props.max) {
      return
    }
    props.handleLast()
  }

  return (
    <div
      className='paginator'
    >
      <button
        type='button'
        className='btn'
        onClick={handleFirst}
        disabled={props.count === 1}
      >
        {'<<'}
      </button>
      
      <button
        type='button'
        className='btn'
        onClick={handlePrev}
        disabled={props.max === 1}
      >
        {'<'}
      </button>
      
      <p
        className=''
      >{props.count}</p>

      <button
        type='button'
        className='btn'
        onClick={handleNext}
        disabled={props.max === 1}
      >
        {'>'}
      </button>
      
      <button
        type='button'
        className='btn'
        onClick={handleLast}
        disabled={props.count === props.max}
      >
        {'>>'}
      </button>
      
      <p
        className=''
      >...{props.max}</p>
      
    </div>
  )
}