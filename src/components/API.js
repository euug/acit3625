import React, { useEffect, useState } from "react";
import axios from 'axios';

function API() {
    const [appState, setAppState] = useState({
        name: "",
        picture: "https://cdn.iconscout.com/icon/free/png-256/person-1767893-1502146.png",
        phone: "",
    });

    useEffect(() => {
        const apiUrl = "https://api.randomuser.me/"
        axios.get(apiUrl).then((response) => {
            const content = response.data;
            setAppState({ name: content.results[0].name.first + " " + content.results[0].name.last, picture: content.results[0].picture.large, phone: content.results[0].phone})
        });
    }, [setAppState]);

    return (
        <div>
            <h1>Random Person's Profile</h1>
            <img
                src={appState.picture}
                alt="profile pic"
            />
            <h2>{appState.name}</h2>
            <h3>{appState.phone}</h3>

        </div>
    )
}

export default API;