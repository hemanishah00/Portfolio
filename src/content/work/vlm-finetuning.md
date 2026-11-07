---
title: "VLM Fine-tuning"
domain: genai
stack: ["LoRA", "Quantization", "LLaVA", "Vision-language models"]
impact: "Pipeline to fine-tune a vision-language model on custom datasets within modest GPU memory."
featured: true
---

## Problem

Off-the-shelf vision-language models are general. For a specific domain they need adapting to custom image-text data, and full fine-tuning of a model this size needs more GPU memory and time than is reasonable for a single task. The problem was to make domain adaptation cheap enough to repeat.

## Approach

I set up a pipeline that fine-tunes a vision-language model on custom datasets, using LoRA and quantization to keep it affordable. LoRA trains small low-rank adapter matrices instead of the full weights, which cuts trainable parameters and memory and leaves the adapters as separable, swappable modules. Quantization (Int8 or Int4) shrinks the model for training and for deployment.

The data side is a preprocessing step that standardises image-text pairs, validates and filters them, and batches them for loading. The workflow runs in order: prepare the dataset, pick the base model, configure LoRA, apply quantization, train, evaluate.

My résumé describes related work from the same period: fine-tuning LLaVA and LLaMA with quantization and LoRA for efficient deployment in a fitness application.

## Architecture

<!-- diagram -->

Image-text dataset -> preprocessing (formatting, validation, filtering, batching) -> quantized base VLM with LoRA adapters attached -> training of the adapters only -> evaluation -> deployable quantized model plus adapter.

## Impact

The pipeline makes adapting a vision-language model to a domain practical on limited hardware: fewer trainable parameters, lower memory, and a smaller model to deploy. I have no benchmark numbers for the resulting model or the memory savings, so none are claimed here.
