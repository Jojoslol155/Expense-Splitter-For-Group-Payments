import React from 'react'

type Props = {
    firstName: string,
    lastName: string
}

const Contact = ({firstName, lastName}: Props) => {
  return (
    <div>{firstName} {lastName}</div>
  )
}

export default Contact