function TableRows({ rowsData, deleteTableRows, handleChange }) {
    return (
        rowsData.map((data, index) => {
            const { item, date, subTotal, cityTax, taxPercent, total, source, shippedFrom, shippedTo, billable } = data;

            return (
                <tr key={index} className="table_row">
                    <td><input type="text" value={item} onChange={(evnt) => (handleChange(index, evnt))} name="item" className="form-control" /></td>
                    <td><input type="date" value={date} onChange={(evnt) => (handleChange(index, evnt))} name="date" className="form-control" /></td>
                    <td className="subtotal_col__item"><input type="text" value={subTotal} onChange={(evnt) => (handleChange(index, evnt))} name="subTotal" className="form-control" /></td>
                    <td className="citytax_col__item"><input type="text" value={cityTax} onChange={(evnt) => (handleChange(index, evnt))} name="cityTax" className="form-control" /></td>
                    <td className="taxpercent_col__item"><input type="text" value={taxPercent} onChange={(evnt) => (handleChange(index, evnt))} name="taxPercent" className="form-control" /></td>
                    <td className="total_col__item"><input type="text" value={total} onChange={(evnt) => (handleChange(index, evnt))} name="total" className="form-control" /></td>
                    <td><input type="text" value={source} onChange={(evnt) => (handleChange(index, evnt))} name="source" className="form-control" /></td>
                    <td><input type="text" value={shippedFrom} onChange={(evnt) => (handleChange(index, evnt))} name="shippedFrom" className="form-control" /></td>
                    <td><input type="text" value={shippedTo} onChange={(evnt) => (handleChange(index, evnt))} name="shippedTo" className="form-control" /></td>

                    <td className='checkbox__container'>
                        <input
                            type='checkbox'
                            className='billable'
                            name='billable'
                            checked={billable === 1}
                            onChange={(evnt) => handleChange(index, evnt)}
                        />
                    </td>

                    <td>
                        <button className="btn btn_del" onClick={() => deleteTableRows(index)}>❌</button>
                    </td>
                </tr>
            )
        })
    );
}

export default TableRows;
