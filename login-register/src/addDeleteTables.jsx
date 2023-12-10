import React, { useState } from "react";
import TableRows from "./tableRows"

function AddDeleteTableRows() {

    const [rowsData, setRowsData] = useState([]);
    const [test, setTest] = useState('');

    const addTableRows = () => {

        const rowsInput = {
            test: test
        }
        setRowsData([...rowsData, rowsInput])
    }

    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleChange = (index, evnt) => {

        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }
    return (
        <div className="itemized__content">

            <div className="table_row">
                <div><input type="text" value={test} onChange={(e) => setTest(e.target.value)} /></div>
                <div><input type="text" name="emailAddress" className="form-control" /> </div>
                <div><input type="text" name="salary" className="form-control" /> </div>

                <div><button className="btn btn-outline-success" onClick={addTableRows} >+</button></div>
            </div>

            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

        </div>
    )

}
export default AddDeleteTableRows