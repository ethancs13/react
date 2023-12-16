import axios from "axios";
import { useEffect } from "react";

function Info() {

    const location = document.location.href;
    const email = location.split('/')[4]
    console.log(email)

    const getData = function () {
        axios.get(`/fetch/info/${email}`)
        .then((res) => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    return (
        <div>
            {email}
        </div>

    )

}
export default Info

