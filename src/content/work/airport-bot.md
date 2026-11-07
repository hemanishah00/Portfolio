---
title: "Airport Bot"
domain: genai
stack: ["OpenAI function calling", "Structured agents", "RAG", "Prompt engineering"]
impact: "Customer-service chatbot answering airport questions such as parking and bus services."
featured: true
---

## Problem

Airport passengers ask a long tail of practical questions: where to park, which bus runs to the terminal, what a facility offers. Some of those answers are live data, such as parking availability and schedules, and some are static policy. A chatbot that answers from the language model alone would guess at the first kind.

## Approach

I split the work along that line. Anything that depends on current data goes through OpenAI function calling, where the model decides which airport-service function to call and the function returns the authoritative answer. Anything that is documentation, such as policies and FAQs, goes through retrieval-augmented generation so the reply is grounded in the airport's own text.

On top of that sit structured agents, each scoped to a service area such as parking or transport, plus few-shot and chain-of-thought prompting to keep the model's reading of ambiguous queries consistent.

## Architecture

<!-- diagram -->

A user query goes to a router that selects a structured agent for the relevant service area. The agent either calls a function that reads the service data, or retrieves passages from the knowledge base, and the model composes the reply from that result. New services are added as new agents and functions without touching the others.

## Impact

Passengers get an immediate answer to routine questions about parking, bus services and other airport facilities, drawn from live service data where the answer changes and from the airport's own documentation where it does not. Human agents are no longer the only way to get that information, and the same service coverage is available at any hour. New service areas are added as another agent and set of functions rather than a rewrite.
