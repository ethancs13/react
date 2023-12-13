import {
    CitySelect,
    StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import { useState } from 'react';

function TableRows({ rowsData, deleteTableRows, handleChange }) {

    const [stateid, setstateid] = useState(0);
    const [cityid, setcityid] = useState(0);

    return (

        rowsData.map((data, index) => {
            const { item, date, subTotal, cityTax, taxPercent, total, source, location, billable } = data;


            return (

                <tr key={index} className="table_row">

                    <td><input type="text" value={item} onChange={(evnt) => (handleChange(index, evnt))} name="item" className="form-control" /></td>
                    <td><input type="date" value={date} onChange={(evnt) => (handleChange(index, evnt))} name="date" className="form-control" /></td>
                    <td className="subtotal_col__item"><input type="text" value={subTotal} onChange={(evnt) => (handleChange(index, evnt))} name="subTotal" className="form-control" /></td>
                    <td className="citytax_col__item"><input type="text" value={cityTax} onChange={(evnt) => (handleChange(index, evnt))} name="cityTax" className="form-control" /></td>
                    <td className="taxpercent_col__item"><input type="text" value={taxPercent} onChange={(evnt) => (handleChange(index, evnt))} name="taxPercent" className="form-control" /></td>
                    <td className="total_col__item"><input type="text" value={total} onChange={(evnt) => (handleChange(index, evnt))} name="total" className="form-control" /></td>
                    <td><input type="text" value={source} onChange={(evnt) => (handleChange(index, evnt))} name="source" className="form-control" /></td>
                    <td><input type="text" value={location} onChange={(evnt) => (handleChange(index, evnt))} name="location" className="form-control" /></td>
                    <td>
                        <div className="test">
                            <StateSelect
                            className='state_dropdown__input'

                                countryid={233}
                                onChange={(e) => {
                                    setstateid(e.id);
                                }}
                                placeHolder="State"
                            />
                            <CitySelect
                            className='city_dropdown__input'

                                countryid={233}
                                stateid={stateid}
                                onChange={(e) => {
                                    setcityid(e.id)
                                }}
                                placeHolder="City"
                            />
                        </div>
                    </td>

                    <td className='checkbox__container'>
                        <input type='checkbox' className='billable' name='billable' value={billable} onChange={(evnt) => (handleChange(index, evnt))} />
                    </td>

                    <td>
                        <button className="btn btn_del" onClick={() => (deleteTableRows(index))}>❌</button>

                    </td>

                </tr>


            )
        })

    )

}

export default TableRows;