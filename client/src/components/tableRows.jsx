import React, { useState } from "react";

function TableRows({ rowsData, deleteTableRows, handleChange }) {
    // State for billable checkbox
    const handleBillableChange = (index, e) => {
        const newBillableValue = e.target.checked;
        handleChange(index, { target: { name: 'billable', value: newBillableValue } });
    };

    return (
        rowsData.map((data, index) => {
            const { item, date, subTotal, cityTax, taxPercent, total, source, shippedFrom, shippedTo, billable: initialBillable } = data;

            return (
                <tr key={index} className="table_row">
                    <td className="bot-items"><input type="text" value={item} onChange={(evnt) => (handleChange(index, evnt))} name="item" className="form-control" required /></td>
                    <td className="bot-items"><input type="date" value={date} onChange={(evnt) => (handleChange(index, evnt))} name="date" className="form-control" required /></td>
                    <td className="bot-items subtotal_col"><input type="text" value={subTotal} onChange={(evnt) => (handleChange(index, evnt))} name="subTotal" className="form-control" required /></td>
                    <td className="bot-items citytax_col"><input type="text" value={cityTax} onChange={(evnt) => (handleChange(index, evnt))} name="cityTax" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={taxPercent} onChange={(evnt) => (handleChange(index, evnt))} name="taxPercent" className="form-control" required /></td>
                    <td className="bot-items total_col"><input type="text" value={total} onChange={(evnt) => (handleChange(index, evnt))} name="total" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={source} onChange={(evnt) => (handleChange(index, evnt))} name="source" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={shippedFrom} onChange={(evnt) => (handleChange(index, evnt))} name="shippedFrom" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={shippedTo} onChange={(evnt) => (handleChange(index, evnt))} name="shippedTo" className="form-control" required /></td>

                    {/* checkbox */}
                    <td className='checkbox__container'>
                        <input type='checkbox' className='billable' name='billable' checked={initialBillable} onChange={(e) => handleBillableChange(index, e)} />
                    </td>

                    <td className="checkbox__del">
                        <button className="btn btn_del" onClick={(evnt) => deleteTableRows(evnt, index)}>❌</button>
                    </td>
                </tr>
            )
        })
    );
}

export default TableRows;
