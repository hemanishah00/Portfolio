# Authoritative experience bullets

Source: the user's current résumé (`~/Desktop/HN Shah Resume.pdf`, Aug 2025), which the user
supplied as authoritative and superseding the repo's older PDF.

Use these verbatim as the `bullets` arrays in `src/content/experience.json`. Do not paraphrase,
summarise, shorten or embellish. Where a role is listed with no bullets below, the résumé gives
none — use an empty array. Do not invent any.

---

## Relanto — Senior Data Scientist / Senior AI Engineer — Bengaluru — 2025-09 → present

Exactly one bullet, already correct in the file. Do not change it, and do not add to it:

- Multi-agent workflow systems and LLM observability for enterprise customer engagement.

The résumé's actual Relanto bullets describe xDR sales-automation work. The user has explicitly
excluded that from the site. Do not copy them in.

---

## 9Nexus — GenAI Developer — 2024-10 → 2025-09 — client: Consulted for Cognizant and GSK

- Developed an LLM-powered workflow analyzing 150K+ employee feedback comments and live agent call transcripts to uncover hidden Source-to-Pay process issues.
- Built Databricks-based ETL pipelines using Pandas, extracted themes, sentiment, processes, and personas, and stored insights in SQL and VectorDB systems for RAG applications.
- Enabled executive leadership to identify systemic and regional pain points through automated executive summaries and root-cause analysis APIs.
- Reduced reporting turnaround time from 5 months to under 5 minutes, achieving approximately 99.9% effort reduction.
- Developed a table extraction pipeline using Azure Document Intelligence to retrieve study intervention tables from document repositories and standardize outputs through RegEx-based cleaning.
- Built intelligent document processing solutions to extract scientific substance information and key attributes from PDFs using OCR, Azure AI Search, and Retrieval-Augmented Generation techniques.

---

## ARThink AI — Data Scientist – Generative AI — 2023-08 → 2024-07

- Built an end-to-end virtual assistant pipeline integrating multilingual speech-to-text, translation, Retrieval-Augmented Generation, and text-to-speech capabilities.
- Fine-tuned LLaVA and LLaMA models using Quantization and LoRA techniques for efficient deployment in a fitness application.
- Developed a facial-recognition-based attendance management system using video-to-video comparison to handle varying lighting conditions, facial expressions, and viewing angles.
- Built a customer service chatbot for an airport using structured agents, OpenAI function calling, few-shot prompting, chain-of-thought prompting, and RAG.
- Developed an automated image-processing pipeline using YOLO-based ROI detection for spectacle prescription classification and information extraction.

---

## DeetsDigital — Data Science Trainee — 2023-02 → 2023-07

- Implemented super-resolution techniques to enhance drone imagery for downstream object detection tasks.
- Automated invoice information extraction from PDF documents and transformed outputs into client-specific Excel formats.
- Applied OCR techniques for multilingual document understanding and information extraction.
- Built proof-of-concept sentiment analysis solutions on facial data captured through CCTV footage.
- Developed resume parsing workflows using OCR and LLMs to dynamically match candidates to relevant job descriptions.

---

## Univ.AI — Teaching Assistant — 2022-04 → 2023-01

No bullets. The résumé lists this role under "Internships, Volunteering and Part time Jobs" with a
title and dates only. Use `"bullets": []`.

---

## Advanced Business & Healthcare Solutions — Quality Analyst Trainee Intern — 2022-01 → 2022-06

No bullets, same reason. Use `"bullets": []`.

---

## Locations

The résumé gives a location for Relanto only (Bengaluru). The other five entries keep
`"location": ""`. Do not fabricate locations. Components that render the timeline must omit the
location element entirely when the string is empty, rather than printing a stray separator or an
empty span.
