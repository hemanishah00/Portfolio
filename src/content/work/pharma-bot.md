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

The bot is a speech pipeline wrapped around retrieval-augmented generation. Twilio handles the telephony in both directions. Speech recognition turns the caller's audio into text; an interaction layer (IBS) works out what the caller is asking and keeps session context across the call; retrieval pulls the relevant pharmaceutical material; an LLM writes the answer from what was retrieved; text-to-speech speaks it back over the line.

Because the content is medical, the design leans on grounding the answer in retrieved sources rather than the model's memory, and on escalation to a human agent when the bot should not answer.

## Architecture

<!-- diagram -->

Call (inbound or outbound, via Twilio) -> ASR -> IBS (intent, session state, call flow, escalation) -> RAG retrieval over pharmaceutical data -> LLM response -> TTS -> audio back through Twilio. Every turn of the call runs this loop.

## Impact

The write-up for this project states design intent: round-the-clock access to medical information by voice, less load on call-centre agents, and consistent answers within safety limits. I have no measured figures for it, such as deflection rate, accuracy or latency, so none are claimed here.
