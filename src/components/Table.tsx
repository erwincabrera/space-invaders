import React from 'react'

interface Row {
  left: any;
  right: any;
}

interface Props {
  title?: string;
  rows: Row[];
}

export const Table: React.FC<Props> = (props) => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <th colSpan={2}>{props.title}</th>
      </thead>
      <tbody>
        {props.rows.map(eachRow => (
          <tr>
            <td style={{ textAlign: "left" }}>{eachRow.left}</td>
            <td style={{ textAlign: "right" }}>{eachRow.right}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
