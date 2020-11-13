import React from 'react'
import { Table } from './Table'

interface Key {
  key: string;
  description: string;
}

interface Props {
  keys: Key[]
}

export const ControlsTable: React.FC<Props> = (props) => {
  return (
    <Table
      title="Controls"
      rows={props.keys.map(eachKey => ({
        left: <span className="movement-key">{eachKey.key}</span>,
        right: eachKey.description
      }))}
    />
  )
}
