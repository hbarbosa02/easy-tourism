import { useEffect } from "react";
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { eraseLocalStorage } from "../../services/auth";

function Logout() {
    const history = useHistory();

    useEffect(() => {
        eraseLocalStorage()
        history.push("/");
    }, [])
    return <div />;   
}

export default Logout;