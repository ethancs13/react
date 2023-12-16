import { useState, useEffect } from "react";
import axios from 'axios';

function Admin({ update }) {

    const [adminData, setAdminData] = useState([])


    const fetchData = function () {
        axios.get('http://localhost:3001/fetch')
            .then((res) => {
                console.log(res.data)
                setAdminData(res.data)
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (

        adminData.map((data, index) => {
            const { fn, ln, email } = data;

            return (
                <tr key={index}>
                    <td>
                        {fn} {ln} {email}
                    </td>
                </tr>
            )
        })

    )

}
// <button onClick={fetchData}>click to fetch</button>
export default Admin

