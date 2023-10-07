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
        className=''
        onClick={handleFirst}
      >
        {'<<'}
      </button>
      
      <button
        type='button'
        className=''
        onClick={handlePrev}
      >
        {'<'}
      </button>
      
      <span
        className=''
      >{props.count}</span>

      <button
        type='button'
        className=''
        onClick={handleNext}
      >
        {'>'}
      </button>
      
      <button
        type='button'
        className=''
        onClick={handleLast}
      >
        {'>>'}
      </button>
      
      <span
        className=''
      >{props.max}</span>
      
    </div>
  )
}