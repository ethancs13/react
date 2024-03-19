import { useState, useEffect } from "react"
import TableRows_food from "./tableRows_food"

function AddDeleteTableRows_food({ update }) {

    const [rowsData, setRowsData] = useState([]);

    // update(rowsData)

    const addTableRows_food= (e) => {
        e.preventDefault();
        const { date, amount, restaurant, persons, title, reason, billable, PoRCC } = rowsData;

        const rowsInput = {
            date: date,
            amount: amount,
            restaurant: restaurant,
            persons: persons,
            title: title,
            reason: reason,
            billable: billable,
            PoRCC: PoRCC,
        }
        setRowsData([...rowsData, rowsInput])
        update(rowsData)
    }

    const deleteTableRows_food = (evnt, index) => {
        evnt.preventDefault();
        console.log(rowsData)
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
        update(rowsData)
    }

    const handleChange = (index, evnt) => {
        evnt.preventDefault();
        console.log(rowsData)
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
                <th>Date</th>
                <th className="subtotal_col">Amount</th>
                <th className="citytax_col">Location</th>
                <th className="taxpercent_col">Persons</th>
                <th className="total_col">Title</th>
                <th>Reason</th>
                <th>PoRCC</th>
                <th>Billable</th>
                <th className="add-row"><button className="btn btn_add" onClick={(e) => addTableRows_food(e)} >+</button></th>
            </tr>

            <TableRows_food rowsData={rowsData} deleteTableRows={deleteTableRows_food} handleChange={handleChange} />

        </tbody>
    )

}
export default AddDeleteTableRows_food

