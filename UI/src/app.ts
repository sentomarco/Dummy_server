document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm') as HTMLFormElement;
    const messageInput = document.getElementById('messageInput') as HTMLInputElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;

    // Chiamata GET immediata per mostrare il messaggio iniziale
    fetch('/service1/hello')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Presumendo che la risposta abbia la struttura { "message": "..." }
            resultDiv.textContent = data.message;
            resultDiv.style.color = 'black';
        })
        .catch(error => {
            resultDiv.textContent = `Errore nel recupero del messaggio: ${error}`;
            resultDiv.style.color = 'red';
        });

    // Gestione del submit per la chiamata POST
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const message = messageInput.value.trim();
        if (!message) {
            resultDiv.textContent = 'Per favore, inserisci un messaggio.';
            resultDiv.style.color = 'red';
            return;
        }

        try {
            // La chiamata POST viene effettuata in modo relativo così da passare tramite il gateway
            const response = await fetch('/service1/hello', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error(`Errore: ${response.statusText}`);
            }

            const data = await response.json();
            // Presumendo che la risposta contenga { "response": "..." }
            resultDiv.textContent = `Messaggio inserito: ${data.response}`;
            resultDiv.style.color = 'green';
        } catch (error) {
            resultDiv.textContent = `Errore nell'invio del messaggio: ${error}`;
            resultDiv.style.color = 'red';
        }
    });
});
