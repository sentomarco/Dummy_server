package com.example.service1

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.*

@SpringBootApplication
class Service1Application

fun main(args: Array<String>) {
    runApplication<Service1Application>(*args)
}

@RestController
//Questa riga è inserita per accettare richieste che provengono dal di fuori del mio indirizzo
//Non ottimale per la sicurezza (Al momento uso per UI)
@CrossOrigin(origins = ["*"])
class HelloController {

    // Endpoint GET già presente (opzionale, se vuoi tenerlo)
    @GetMapping("/hello")
    fun sayHello(): Map<String, String> {
        return mapOf("message" to "Hello from Marco's Service1 of the Dummy_Server project!")
    }

    // Nuovo endpoint POST per gestire il messaggio in ingresso
    @PostMapping("/hello")
    fun updateMessage(@RequestBody body: Map<String, String>): Map<String, String> {
        val userMessage = body["message"] ?: "Nessun messaggio ricevuto"
        // Puoi personalizzare ulteriormente il messaggio se lo desideri
        val responseMessage = "Messaggio inserito: $userMessage"
        return mapOf("response" to responseMessage)
    }
}
