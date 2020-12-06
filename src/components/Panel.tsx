import React from 'react'

interface Props {
  width: string;
}

export const Panel: React.FC<Props> = (props) => {

  return (
    <section className={`panel`} style={{width: props.width}}>
      {props.children}
    </section>
  )
}
