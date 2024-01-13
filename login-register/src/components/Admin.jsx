import React, { useState, useEffect } from "react";
import axios from 'axios';
import Info from './Info';  // Import the Info component
import '../css/Admin.css'

function Admin() {
    const [adminData, setAdminData] = useState([]);
    const [selectedUserDataMap, setSelectedUserDataMap] = useState({});

    const handleGetInfo = function (email) {
        if (selectedUserDataMap[email]) {
            setSelectedUserDataMap(prevData => ({
                ...prevData,
                [email]: null,
            }));
        } else {
            axios.get(`http://localhost:3001/fetch/info/${email}`)
                .then((res) => {
                    setSelectedUserDataMap(prevData => ({
                        ...prevData,
                        [email]: res.data,
                    }));
                })
                .catch((error) => {
                    console.error('Error fetching info:', error);
                });
        }
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
        <table className="admin_userTable">
            <tbody>
                {adminData.map((data, index) => {
                    const { fn, ln, email } = data;
                    const selectedUserData = selectedUserDataMap[email];

                    return (
                        <React.Fragment key={index}>
                            <tr className="admin_userRows" onClick={() => handleGetInfo(email)}>
                                <td className="user-name">
                                    {fn} {ln}
                                </td>
                                <td className="user-email">
                                    {email}
                                </td>
                            </tr>
                            <tr className="admin_dataRow">
                                <td colSpan="2">
                                    {selectedUserData && <Info data={selectedUserData} />}
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                })}
            </tbody>
        </table>
    );

}

export default Admin;
