import React, { useState, useEffect } from "react";
import axios from 'axios';
import Info from './Info';  // Import the Info component

function Admin() {
    const [adminData, setAdminData] = useState([]);
    const [selectedUserData, setSelectedUserData] = useState(null); // New state to store selected user data

    const handleGetInfo = function (email) {
        const requestBody = { email: email };

        axios.get(`http://localhost:3001/fetch/info/${email}`, requestBody)
            .then((res) => {
                setSelectedUserData(res.data); // Set selected user data when response is received
            })
            .catch((error) => {
                console.error('Error fetching info:', error);
            });
    };

    const fetchData = function () {
        axios.get('http://localhost:3001/fetch')
            .then((res) => {
                setAdminData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {adminData.map((data, index) => {
                        const { fn, ln, email } = data;

                        return (
                            <tr key={index}>
                                <td>{fn} {ln}</td>
                                <td>{email}</td>
                                <td>
                                    <button onClick={() => handleGetInfo(email)}>
                                        View Info
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <table className="data_table">
                {selectedUserData && <Info data={selectedUserData} />} {/* Render Info component with selected user data */}
            </table>

        </div>
    );
}

export default Admin;
