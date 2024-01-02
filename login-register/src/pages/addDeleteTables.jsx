import { useState, useEffect } from "react"
import TableRows from "./tableRows"

function AddDeleteTableRows({ update }) {

    const [rowsData, setRowsData] = useState([]);

    update(rowsData)

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
            billable: 0,
        }
        setRowsData([...rowsData, rowsInput])
    }

    const deleteTableRows = (evnt, index) => {
        evnt.preventDefault();
        
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);

    }

    const handleChange = (index, evnt) => {
        evnt.preventDefault();
        const { name, value, type } = evnt.target;
        const newValue = type === 'checkbox' ? (evnt.target.checked ? 1 : 0) : value;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = newValue;
        setRowsData(rowsInput);
    };
    
    
    return (
        <tbody className="itemized__content">

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
                <th><button className="btn btn_add" onClick={(e) => addTableRows(e)} >+</button></th>
            </tr>

            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

        </tbody>
    )

}
export default AddDeleteTableRows

