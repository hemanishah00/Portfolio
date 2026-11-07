---
title: "EDAA"
domain: computer-vision
stack: ["React", "moviepy", "ASR", "SBERT", "YOLO", "GCS", "Plotly.js"]
impact: "Web app that reports audience reactions to a speech from video and speech text."
featured: true
---

## Problem

A public speaker gets almost no usable feedback on how a talk landed. The audience's reaction is visible in their faces and audible in what the speaker said, but there is no record of either against a timeline. EDAA, Emotion Detection and Analysis, takes a recording of a speech and produces a report of audience reactions so the speaker can see which moments worked.

## Approach

Two signals are analysed separately and then shown together. The text signal is the speech itself: audio is transcribed, and the sentiment of each segment is predicted. The video signal is the audience: faces in each segment are classified as positive, neutral or negative and counted. Both are keyed by the same time interval, so a stretch of the speech can be set beside the reaction it drew.

The system is split into containers by job: preprocessing, speech recognition, sentiment, and face analysis. Results are exchanged through a GCS bucket, which keeps each stage independent. This was a team project.

## Architecture

<!-- diagram -->

A React frontend uploads the encoded video to the server. A preprocessor decodes it, extracts the audio with moviepy, and splits audio and video into 10-second chunks. The ASR container transcribes each audio chunk and the SBERT container predicts its sentiment, writing a record per interval (sentence, prediction, start, stop) to GCS. The YOLO container reads the video chunks and writes per-interval counts of positive, neutral and negative faces. The frontend retrieves both result sets and plots them with Plotly.js.

## Impact

A speaker uploads a recording and gets back a timeline: for every 10-second interval, what was said, the sentiment of those words, and how many faces in the audience read as positive, neutral or negative. That lets a speaker see which moments the audience responded to and rewrite or re-pace the rest. The project shipped as a working web app with its code repository, a presentation video and a detailed report.
