import React, { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('Caricamento...');
    const [input, setInput] = useState('');

    useEffect(() => {
        fetch('/service1/hello')
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch(() => setMessage('Errore nel caricamento.'));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/service1/hello', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input }),
        });
        const data = await res.json();
        setMessage(data.response);
        setInput('');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Interfaccia Dummy Server</h1>
            <div style={styles.messageBox}>{message}</div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    style={styles.input}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Scrivi un messaggio"
                />
                <button style={styles.button} type="submit">Invia</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
        textAlign: 'center' as const,
        backgroundColor: '#f2f2f2',
        minHeight: '100vh',
    },
    title: {
        color: '#333',
    },
    messageBox: {
        backgroundColor: '#fff',
        padding: '1rem',
        marginBottom: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        fontSize: '1.2rem',
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
    },
    input: {
        padding: '0.5rem',
        width: '300px',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '6px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
};

export default App;
