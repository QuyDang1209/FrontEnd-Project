import React from 'react';
import './App.css';
import ProfileForm from "./components/edit/ProfileForm";
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