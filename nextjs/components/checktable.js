
const CheckTable = ({ columns, data, id_key, checked, callback }) => {
    const id_param = id_key
    
    const isChecked = (i)  => {
      if(i in checked) {
        return checked[i]
      }
      return false
    }

    

    return (
        <div className="full-width">
            <table className="table table-bordered table-hover full-width">
                {
                  <thead>
                    <tr>
                      {" "}
                      {columns.map(column => {
                        return <th key={column.Header}> {column.Header} </th>;
                      })}{" "}
                    </tr>{" "}
                    </thead>
                }
                {
                  <tbody>
                    {
                      data.map((row) => {
                        return (
                          <tr key={row[id_param]}>
                            {
                            columns.map(function (column) {
                              if(column.Header == 'Select')
                                return (
                                <td key={`${row[id_param]}_${column.Header}`}>
                                  <input type="checkbox" checked={isChecked(row[id_param])} onChange={() => callback(row, id_param)} />
                                </td>
                              );
                              else
                              return (
                                <td key={`${row[id_param]}_${column.Header}`}>
                                  {row[column.accessor]}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })
                    }
                  </tbody>
                }
            </table>
        </div>
    )
}

export default CheckTable;