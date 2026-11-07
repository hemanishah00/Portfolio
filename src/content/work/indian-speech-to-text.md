---
title: "Indian Speech-to-Text"
domain: genai
stack: ["Multilingual ASR", "Language detection", "Neural machine translation"]
impact: "Transcribes speech in Indian languages and translates it into another language."
featured: true
---

## Problem

Speech in India is multilingual by default, and a recognition system built around one language fails on the rest. Speakers use Hindi, Tamil, Telugu, Bengali, Marathi and others, often with regional dialects and with languages mixed inside a single conversation. The goal was one pipeline that takes audio in any of those languages and produces text a reader of a different language can use.

## Approach

The pipeline detects the source language first, then transcribes with recognition for that language, then cleans and normalises the text, then translates it to the target language with a neural machine translation model.

Detecting the language up front lets the system pick the right acoustic and language models rather than forcing one model to cover every script, and it reports a confidence so a doubtful detection can be flagged. The cleaning step sits between recognition and translation because recognition errors compound if they are passed straight into the translator.

## Architecture

<!-- diagram -->

Audio in -> language detection (with confidence) -> speech recognition in the source language -> text cleaning and normalisation -> neural machine translation -> text out in the source and target languages.

## Impact

The pipeline lets a recording in an Indian language be read in another language, which supports accessibility, education and business use. I have no word-error-rate or translation-quality figures for it, so none are claimed here.
