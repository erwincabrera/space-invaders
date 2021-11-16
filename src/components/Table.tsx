import React from "react";

interface Row {
  key: string;
  left: any;
  right: any;
}

interface Props {
  title?: string;
  rows: Row[];
}

export const Table: React.FC<Props> = (props) => {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th colSpan={2}>{props.title}</th>
        </tr>
      </thead>
      <tbody>
        {props.rows.map((eachRow) => (
          <tr key={eachRow.key}>
            <td style={{ textAlign: "left" }}>{eachRow.left}</td>
            <td style={{ textAlign: "right" }}>{eachRow.right}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
