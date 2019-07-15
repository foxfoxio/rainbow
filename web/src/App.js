import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'

export const Facebookz = styled.div`
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;

  div {
    display: block;
    background-image: url('/img/event.jpg');
    background-size: cover;
    background-repeat: no-repeat
    background-position: 50% 50%;
    background-color: whitesmoke;
  }

  .cover
  {
    width: 820px;
    height: 430px;
  }

  .event
  {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
    
    width: 500px;
    height: 262px;

    input[type='text'] {
      background-color:rgb(0,0,0,0);
      border-width: 0;
      font-size: 32px;
      width: fit-content;
      height: fit-content;
      text-shadow: -1px 0 red, 1px 0 cyan;
      color: white;
      text-align: center;
    }
  }
`

export default () => {
  const [eventTitle] = useState('Python for Data Science')
  const [size, setSize] = useState(eventTitle.length)
  const eventRef = useRef(null)

  const onChange = e => {
    const newSize = Math.max(e.target.value.length, 1)

    e.target.size = newSize
    setSize(newSize)
  }

  const onClick = () => {
    const node = eventRef.current

    domtoimage
      .toBlob(node)
      .then(blob => {
        saveAs(blob, 'event.png')
      })
      .catch(error => {
        console.error('oops, something went wrong!', error)
      })
  }

  return (
    <Facebookz>
      <h1>Cover</h1>
      <small>Recommend 1200x628 pixels (1.9:1)</small>
      <small>Real use 820x430 pixels</small>
      <div className='cover' />
      <button>SAVE</button>
      <hr />
      <h1>Event</h1>
      <small>500x262 pixels</small>
      <div className='event' ref={eventRef}>
        <input type='text' size={size} onChange={onChange} defaultValue={eventTitle} />
      </div>
      <button onClick={onClick}>SAVE</button>
      <br />
    </Facebookz>
  )
}
