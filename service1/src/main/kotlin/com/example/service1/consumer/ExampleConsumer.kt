package com.example.service1.consumer


import  com.example.service1.config.EXAMPLE_TOPIC_NAME
import  com.example.service1.config.EXAMPLE_TOPIC_NAME_THREE
import  com.example.service1.config.EXAMPLE_TOPIC_NAME_TWO
import  com.example.service1.config.GROUP_ID

import org.slf4j.LoggerFactory
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Component

@Component
class ExampleConsumer {
    private val logger = LoggerFactory.getLogger(this.javaClass)
    @KafkaListener(topics = [EXAMPLE_TOPIC_NAME], groupId = GROUP_ID)
    fun firstListener(message: String) {
        logger.info("Message received: [$message]")
    }
}