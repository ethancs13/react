import { useState } from "react";
function TableRows_food({ rowsData, deleteTableRows, handleChange }) {

    return (
        rowsData.map((data, index) => {
            const { date, amount, restaurant, persons, title, reason, billable, PoRCC } = data;

            return (
                <tr key={index} className="table_row">
                    <td className="bot-items"><input type="date" value={date} onChange={(evnt) => (handleChange(index, evnt))} name="date" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={amount} onChange={(evnt) => (handleChange(index, evnt))} name="amount" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={restaurant} onChange={(evnt) => (handleChange(index, evnt))} name="restaurant" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={persons} onChange={(evnt) => (handleChange(index, evnt))} name="persons" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={title} onChange={(evnt) => (handleChange(index, evnt))} name="title" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={reason} onChange={(evnt) => (handleChange(index, evnt))} name="reason" className="form-control" required /></td>
                    <td className="bot-items"><input type="text" value={PoRCC} onChange={(evnt) => (handleChange(index, evnt))} name="PoRCC" className="form-control" required /></td>

                    {/* checkbox */}
                    <td className='checkbox__container'>
                        <input type='checkbox' className='billable' name='billable' onChange={(e) => setBillable(e.target.checked ? 1 : 0)} />
                    </td>

                    <td className="checkbox__del">
                        <button className="btn btn_del" onClick={(evnt) => deleteTableRows(evnt, index)}>❌</button>
                    </td>
                </tr>
            )
        })
    );
}

export default TableRows_food;
