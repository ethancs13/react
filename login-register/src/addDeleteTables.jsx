import { useState } from "react"
import TableRows from "./tableRows"

function AddDeleteTableRows({ update }) {

    const [rowsData, setRowsData] = useState([]);

    update(rowsData)

    const addTableRows = () => {

        const rowsInput = {}
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

            <tr className="table_row">
                <th>Item</th>
                <th>Purchase Date</th>
                <th className="subtotal_col">Subtotal</th>
                <th className="citytax_col">City Tax</th>
                <th className="taxpercent_col">Tax %</th>
                <th className="total_col">Total</th>
                <th>Source</th>
                <th>Retailer City/State or Internet</th>
                <th>City, State shipped To</th>
                <th className="billable_col">Billable</th>
                <th><button className="btn btn_add" onClick={addTableRows} >+</button></th>
            </tr>

            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

        </div>
    )

}
export default AddDeleteTableRows