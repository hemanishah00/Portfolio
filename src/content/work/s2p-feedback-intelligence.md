---
title: "S2P Feedback Intelligence"
domain: genai
stack: ["LLM", "Databricks", "Pandas", "SQL", "VectorDB", "RAG"]
impact: "5 months of manual analysis down to under 5 minutes, about a 99.9% reduction in effort."
featured: true
---

## Problem

Source-to-Pay (S2P) issues tend to hide. The evidence was already there, spread across 150K+ employee feedback comments and live agent call transcripts, but nobody could read it at that volume. Surfacing systemic and regional pain points from it meant consultants working through the material by hand, which took about 5 months.

The ask was a way for executive leadership to see where the process was breaking, and why, without waiting on a manual analysis cycle.

## Approach

I built an LLM-powered workflow over both sources, comments and call transcripts, rather than a keyword or dashboard-only treatment. The model extracts four things from each item: themes, sentiment, the S2P process it concerns, and the persona speaking. Those structured fields are what make the free text aggregable: issues can be grouped by process and persona instead of being re-read.

The extraction runs in Databricks ETL pipelines written with Pandas. Results land in SQL for aggregate queries and in a vector store for retrieval, so the same corpus serves both a numbers view and a question-answering view.

## Architecture

<!-- diagram -->

Raw comments and call transcripts enter Databricks ETL pipelines (Pandas), where the LLM extraction step tags each item with theme, sentiment, process and persona. Structured output is written to SQL; the text and its embeddings are written to a vector store for RAG. On top of that sit APIs that generate automated executive summaries and root-cause analyses, which is the layer leadership actually consumes.

## Impact

Reporting turnaround dropped from 5 months to under 5 minutes, roughly a 99.9% reduction in effort. Executive leadership could identify systemic and regional pain points directly, with root-cause analysis attached, instead of commissioning a study to find them. This was delivered as consulting work at 9Nexus.
