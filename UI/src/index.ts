document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('messageForm') as HTMLFormElement;
    const messageInput = document.getElementById('messageInput') as HTMLInputElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const message = messageInput.value.trim();
        if (!message) {
            resultDiv.textContent = 'Per favore, inserisci un messaggio.';
            resultDiv.style.color = 'red';
            return;
        }

        try {

            // Effettua una chiamata al servizio 1
            const response = await fetch('/service1/hello', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error(`Errore: ${response.statusText}`);
            }

            const data = await response.json();
            // Presumendo che il JSON restituito abbia una proprietà "response" con il messaggio aggiornato
            resultDiv.textContent = `Messaggio inserito: ${data.response}`;
            resultDiv.style.color = 'green';
        } catch (error) {
            resultDiv.textContent = `Errore nell'invio del messaggio: ${error}`;
            resultDiv.style.color = 'red';
        }


    });
});
