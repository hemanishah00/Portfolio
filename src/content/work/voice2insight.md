---
title: "Voice2Insight"
domain: genai
stack: ["LLM", "Databricks", "Pandas", "SQL", "VectorDB", "RAG", "Sentiment analysis", "Topic modeling"]
impact: "Analysis reports in under 5 minutes against roughly 5 months of manual consultant effort, about a 99.9% effort reduction."
featured: true
---

## Problem

Enterprise Feedback Analytics Dashboard. Source-to-Pay (S2P) issues tend to hide. The evidence was already there, spread across 150K+ employee feedback comments and transcriptions of calls with live agents, but nobody could read it at that volume. Surfacing systemic and regional pain points from it meant consultants working through the material by hand, which took about 5 months.

The ask was a way for CXO leadership to see where the process was breaking, and why, without waiting on a manual analysis cycle.

## Approach

I built an LLM-powered workflow over both sources, comments and call transcripts, rather than a keyword or dashboard-only treatment. The model extracts four things from each item: themes, sentiment, the S2P process it concerns, and the persona speaking. Those structured fields are what make the free text aggregable: issues can be grouped by process, persona and region instead of being re-read.

The extraction runs in Databricks ETL pipelines written with Pandas. Results land in SQL for aggregate queries and in a vector store for retrieval, so the same corpus serves both a numbers view and a question-answering view (RAG).

## Architecture

<!-- diagram -->

Employee comments and agent-call transcriptions enter Databricks ETL pipelines (Pandas), where the LLM extraction step tags each item with theme, sentiment, process and persona. Structured output is written to SQL; the text is stored in a vector store for RAG. On top of that sit APIs that generate automated executive summaries and root-cause analyses, and the dashboard that leadership uses: interactive charts and trends, regional breakdowns, and recommendations tied to the root causes found. This was delivered as consulting work at 9Nexus.

## Impact

Reporting turnaround dropped from about 5 months of manual consultant effort to under 5 minutes, roughly a 99.9% reduction in effort. CXO leadership could uncover previously unknown systemic and regional pain points directly, with root-cause analysis and actionable recommendations attached, and make decisions from data instead of commissioning a study to find the problems first.
