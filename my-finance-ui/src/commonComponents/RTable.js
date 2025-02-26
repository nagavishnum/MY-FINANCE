import { componentMap } from "../constants/constants";
import './Table.css'

const RTable = ({data,handleActions, route }) => {
    const columns = componentMap[route]?.columns || [];
    const keyMap = componentMap[route]?.keyMap || [];
    return (
<div style={{ "--column-count": columns.length + 1 }}>

        <table border="1">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((e, index) => (
                <tr key={index}>
                  {keyMap.map((key, colIndex) => (
                    <td key={colIndex}>
        {key.includes(".") 
          ? key.split(".").reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : "N/A"), e)
          : key === "promissoryNote"
            ? e[key] ? "Yes" : "No"
            : e[key] !== undefined ? e[key] : "N/A"}
      </td>
      
      
                  ))}
                  <td>
                    <button onClick={() => handleActions(e, "edit")} style={{ marginRight: "8px" }}>Edit</button>
                    <button onClick={() => handleActions(e, "delete")} style={{backgroundColor:"red"}}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1}>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      
      
            </div>
    )
}

export default RTable;