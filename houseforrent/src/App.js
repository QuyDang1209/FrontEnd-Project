import React from 'react';
import './App.css';
import ProfileForm from "./Component/ProfileForm/ProfileForm";
import {Avatar, Button, TextField} from "@mui/material";

const App = () => {
    return (
        <div className="App">

            <header className="App-header">
                <ProfileForm />
            </header>
        </div>
    );
};

export default App;