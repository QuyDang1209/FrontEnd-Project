import React, { useState } from 'react';
import axios from 'axios';

function Emailtest() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/send-email', {
            recipient: email,
            subject: subject,
            message: message
        })
        .then(response => {
            alert(response.data);
        })
        .catch(error => {
            alert('Failed to send email');
            console.error(error);
        });
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Subject" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                />
                <button type="submit">Send Email</button>
            </form>
        </div>
    );
}

export default Emailtest;
