package com.example.gateway

import org.springframework.context.annotation.Configuration
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.config.ResourceHandlerRegistry
import org.springframework.web.reactive.config.WebFluxConfigurer


@RestController
class StaticController {

    // Cattura tutte le richieste non indirizzate a /service1 e restituisce index.html
    @GetMapping("/{path:^(?!service1).*}")
    fun forward(): String {
        return "forward:/index.html"
    }
}

@Configuration
class StaticConfig : WebFluxConfigurer {
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/**")
            .addResourceLocations("file:/app/static/")
    }
}