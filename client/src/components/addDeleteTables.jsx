import { useState, useEffect } from "react"
import TableRows from "./tableRows"

function AddDeleteTableRows({ update }) {

    const [rowsData, setRowsData] = useState([]);

    // update(rowsData)

    const addTableRows = (e) => {
        e.preventDefault();
        const { item, date, subTotal, cityTax, taxPercent, total, source, shippedFrom, shippedTo, billable } = rowsData;

        const rowsInput = {
            item: item,
            date: date,
            subTotal: subTotal,
            cityTax: cityTax,
            taxPercent: taxPercent,
            total: total,
            source: source,
            shippedFrom: shippedFrom,
            shippedTo: shippedTo,
            billable: billable,
        }
        setRowsData([...rowsData, rowsInput])
        update(rowsData)
    }

    const deleteTableRows = (evnt, index) => {
        evnt.preventDefault();
        console.log(rowsData)
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
        update(rowsData)
    }

    const handleChange = (index, evnt) => {
        evnt.preventDefault();
        const { name, value } = evnt.target;
        const newValue = value;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = newValue;
        setRowsData(rowsInput);
        update(rowsData)
    };
    
    
    return (
        <tbody>

            <tr className="table_row">
                <th>Item</th>
                <th>Date</th>
                <th className="subtotal_col">Subtotal</th>
                <th className="citytax_col">City Tax</th>
                <th className="taxpercent_col">Tax %</th>
                <th className="total_col">Total</th>
                <th>Source</th>
                <th>Address</th>
                <th>Shipped To</th>
                <th className="billable_col">Billable</th>
                <th className="add-row"><button className="btn btn_add" onClick={(e) => addTableRows(e)} >+</button></th>
            </tr>

            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

        </tbody>
    )

}
export default AddDeleteTableRows

