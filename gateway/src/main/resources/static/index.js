"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const resultDiv = document.getElementById('result');
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (!message) {
            resultDiv.textContent = 'Per favore, inserisci un messaggio.';
            resultDiv.style.color = 'red';
            return;
        }
        try {
            // Effettua una chiamata al servizio 1
            const response = yield fetch('/service1/hello', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });
            if (!response.ok) {
                throw new Error(`Errore: ${response.statusText}`);
            }
            const data = yield response.json();
            // Presumendo che il JSON restituito abbia una proprietà "response" con il messaggio aggiornato
            resultDiv.textContent = `Messaggio inserito: ${data.response}`;
            resultDiv.style.color = 'green';
        }
        catch (error) {
            resultDiv.textContent = `Errore nell'invio del messaggio: ${error}`;
            resultDiv.style.color = 'red';
        }
    }));
});
