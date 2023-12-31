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
                <th></th>
                <th>landline</th>
                <th></th>
                <th>longdist</th>
                <th></th>
                <th>broadband</th>
                <th></th>
                <th>entertainment</th>
                <th></th>
                <th>doc_name</th>
                <th>doc_path</th>
            </tr>
            {rowData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {Object.entries(row).map(([key, value], entryIndex) => (
                        key !== 'id' && key !== 'ln' && (
                            <td key={entryIndex}>
                                {value === 0 ? (
                                    <p>❌</p>
                                ) : value === 1 ? (
                                    <p>✔️</p>
                                ) : (
                                    <p>{value}</p>
                                )}
                            </td>
                        )
                    ))}
                </tr>
            ))}

        </tbody>
    );
}

export default Info;
