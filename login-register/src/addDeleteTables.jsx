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
                <div>Item</div>
                <div>Purchase Date</div>
                <div>Subtotal</div>
                <div>City Tax</div>
                <div>Tax %</div>
                <div>Total</div>
                <div>Source</div>
                <div>Retailer City/State or Internet</div>
                <div>City, State shipped To</div>
                <div>Billable</div>
                <div><button className="btn btn_add" onClick={addTableRows} >+</button></div>
            </div>

            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

        </div>
    )

}
export default AddDeleteTableRows