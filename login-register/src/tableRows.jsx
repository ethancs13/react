function TableRows({ rowsData, deleteTableRows, handleChange }) {


    return (

        rowsData.map((data, index) => {
            const { fullName, emailAddress, salary } = data;
            return (

                <div key={index} className="table_row">
                    
                    <input type="text" value={fullName} onChange={(evnt) => (handleChange(index, evnt))} name="fullName" className="form-control" />
                    
                    <input type="text" value={emailAddress} onChange={(evnt) => (handleChange(index, evnt))} name="emailAddress" className="form-control" /> 
                    <input type="text" value={salary} onChange={(evnt) => (handleChange(index, evnt))} name="salary" className="form-control" /> 
                    <button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button>
                </div>

            )
        })

    )

}

export default TableRows;