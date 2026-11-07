---
title: "Pharma Bot"
domain: genai
stack: ["Twilio", "ASR", "RAG", "LLM", "TTS"]
impact: "Voice bot that answers pharmaceutical customer questions on inbound and outbound calls."
featured: true
---

## Problem

Pharmaceutical customers have questions about drugs and their use, and calls can run either way: the customer phones in, or the company calls the customer. The goal was a bot that handles both directions of a phone call, answers from pharmaceutical reference material rather than from the model's memory, and hands off to a person when it should not answer.

## Approach

The bot is a speech pipeline wrapped around retrieval-augmented generation. Twilio handles the telephony in both directions. Speech recognition turns the caller's audio into text; an interaction layer works out what the caller is asking and keeps session context across the call; retrieval pulls the relevant pharmaceutical material; an LLM writes the answer from what was retrieved; text-to-speech speaks it back over the line.

Because the content is medical, the design leans on grounding the answer in retrieved sources rather than the model's memory, and on escalation to a human agent when the bot should not answer.

## Architecture

<!-- diagram -->

Call (inbound or outbound, via Twilio) -> ASR -> interaction layer (intent, session state, call flow, escalation) -> RAG retrieval over pharmaceutical data -> LLM response -> TTS -> audio back through Twilio. Every turn of the call runs this loop.

## Impact

The bot takes a call end to end in either direction: it recognises the caller's speech, answers from retrieved pharmaceutical reference material, speaks the answer back over the phone line, and transfers to a human agent when the question should not be answered automatically. Routine drug questions can be answered by voice at any hour without an agent on the line, and agents are kept for the calls that need judgment.
