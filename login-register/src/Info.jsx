import React, { useState, useEffect } from 'react';

function Info(props) {
    const data = props.data;

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            let allRowData = [];
            for (let i = 0; i < data.length; i++) {
                if (typeof data[i] === 'object' && data[i] !== null) {
                    allRowData.push(data[i]);
                }
            }
            setRowData(allRowData);
        }
    }, [data]);

    return (
        <tbody className='test'>

            <tr className='header_row'>
                <th>Name</th>
                <th>Email</th>
                <th>Cellphone</th>
                <th>billable</th>
                <th>landline</th>
                <th>billable</th>
                <th>longdist</th>
                <th>billable</th>
                <th>broadband</th>
                <th>billable</th>
                <th>entertainment</th>
                <th>billable</th>
                <th>doc_name</th>
                <th>doc_path</th>
            </tr>


            {rowData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {Object.entries(row).map(([key, value], entryIndex) => (
                        key !== 'id' && key !== 'ln' ?

                            <td key={entryIndex}>
                                <p>{value}</p>
                            </td>
                            :
                            <></>
                    ))}
                </tr>
            ))}

        </tbody>
    );
}

export default Info;
