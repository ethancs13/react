function TableRows({ rowsData, deleteTableRows, handleChange }) {


    return (

        rowsData.map((data, index) => {
            const { item, date, subTotal, cityTax, taxPercent, total, source, location, shippedTo, billable } = data;
            return (

                <div key={index} className="table_row">

                    <input type="text" value={item} onChange={(evnt) => (handleChange(index, evnt))} name="item" className="form-control" />
                    <input type="text" value={date} onChange={(evnt) => (handleChange(index, evnt))} name="date" className="form-control" />
                    <input type="text" value={subTotal} onChange={(evnt) => (handleChange(index, evnt))} name="subTotal" className="form-control" />
                    <input type="text" value={cityTax} onChange={(evnt) => (handleChange(index, evnt))} name="cityTax" className="form-control" />
                    <input type="text" value={taxPercent} onChange={(evnt) => (handleChange(index, evnt))} name="taxPercent" className="form-control" />
                    <input type="text" value={total} onChange={(evnt) => (handleChange(index, evnt))} name="total" className="form-control" />
                    <input type="text" value={source} onChange={(evnt) => (handleChange(index, evnt))} name="source" className="form-control" />
                    <input type="text" value={location} onChange={(evnt) => (handleChange(index, evnt))} name="location" className="form-control" />
                    <input type="text" value={shippedTo} onChange={(evnt) => (handleChange(index, evnt))} name="shippedTo" className="form-control" />

                    <div className='checkbox__container'>
                        <input type='checkbox' className='billable' name='billable' value={billable} onChange={(evnt) => (handleChange(index, evnt))} />
                    </div>

                    <button className="btn btn_del" onClick={() => (deleteTableRows(index))}>❌</button>
                </div>

            )
        })

    )

}

export default TableRows;