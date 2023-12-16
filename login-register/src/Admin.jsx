import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin () {

    const navigate = useNavigate();

    const [adminData, setAdminData] = useState([])

    const handleGetInfo = function (email) {
        const requestBody = { email: email };
        console.log('Request Body:', requestBody);

        axios.post('http://localhost:3001/fetch/info', requestBody)
            .then((res) => {
                console.log('Response data:', res.data);
                navigate(`/info/${email}`);
            })
            .catch((error) => {
                console.error('Error fetching info:', error);
            });
    };

    const fetchData = function () {
        axios.get('http://localhost:3001/fetch')
            .then((res) => {
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
                        <button onClick={() => handleGetInfo(email)}>
                            {fn} {ln} {email}
                        </button>
                    </td>
                </tr>
            )
        })

    )

}

export default Admin

