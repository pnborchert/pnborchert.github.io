---
layout: default
---

## Language Fusion for Parameter-Efficient Cross-lingual Transfer

<div style="display: flex; justify-content: center; align-items: center; gap: 2em; margin-bottom: 1.5em;">
  <a href="https://github.com/pnborchert/FLARE" target="_blank" style="display:flex;align-items:center;gap:0.5em;text-decoration:none;font-weight:500;"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style="width:1.3em;height:1.3em;vertical-align:middle;"/> GitHub</a>
  <a href="https://arxiv.org/abs/2501.06892" target="_blank" style="display:flex;align-items:center;gap:0.5em;text-decoration:none;font-weight:500;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/ArXiv_logo_2022.svg/1024px-ArXiv_logo_2022.svg.png" alt="arXiv" style="height:1.3em;vertical-align:middle;"/> arXiv</a>
</div>

<div style="text-align: center; margin-bottom: 2em;">
  <img src="assets/img/flare.jpeg" alt="Paper overview" style="max-width: 380px; width: 100%; border-radius: 1em; box-shadow: 0 2px 10px 0 rgba(60,60,80,0.08); border: 1.5px solid #e5e5e5; background: #fafbfc;">
  <div style="color:#789;font-size:0.95em; margin-top: 0.5em;">(Figure: Overview of FLARE)</div>
</div>

<div style="max-width:600px;margin:0 auto 2em auto;">
  <div style="background:rgba(245,247,255,0.9);border-radius:1em;padding:1.3em 2em;border:1.5px solid #d2e2fa;box-shadow:0 2px 10px 0 rgba(60,90,180,0.06);">
    <h3 style="margin-top:0;">TL;DR:</h3>
    <ul style="margin-bottom:0;line-height:1.55;">
      <li><b>FLARE</b> fuses knowledge from both source language (English) and target language representations inside parameter-efficient adapters.</li>
      <li>Enables multilingual LLMs to perform better at natural language understanding (NLU) in low-resource languages, while remaining resource-efficient.</li>
      <li>No extra parameters or compute overhead, just clever adapter wiring and translation.</li>
    </ul>
  </div>
</div>

---

### Motivation

Multilingual language models like Llama 3 and Gemma 2 are still trained almost entirely on English data, Llama 3's pretraining is only about <b>5% multilingual</b><br>
<div style="text-align:center;margin:1.5em 0;">
  <img src="assets/img/project_flare/llama_lang_distribution.png" alt="Llama. 3 Language Distribution" style="width:450px;max-width:90vw;border-radius:0.6em;border:1.5px solid #e5e5e5;box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
  <div style="color:#789;font-size:0.93em;">(Llama 3 pretraining data ratio)</div>
</div>

This imbalance results in a much stronger English representation space. Ideally, a cross-lingual transfer method can tap into these strong English representations when adapting to new (target) languages.

---

### Meet FLARE: Fusion for Language Representations!

FLARE an effective method that enables multilingual LLMs to use both source (e.g., English) and target language knowledge to improve NLU performance.<br>
It's also lightweight: FLARE doesn't add any additional parameters to the model.

---

### Cross-lingual Transfer: How it Works

We start with a multilingual LLM and assume we have labeled data in the source language (let's use English as our example).<br>
First, we fine-tune the model on English task data using supervised learning.

<div style="text-align:center;margin:1.5em 0;">
  <img src="assets/img/project_flare/clt_setup.png" alt="Cross-lingual Transfer Pipeline" style="width:450px;max-width:95vw;border-radius:0.6em;border:1.5px solid #e5e5e5;box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
  <div style="color:#789;font-size:0.93em;">(Figure: Cross-lingual transfer setup)</div>
</div>

---

### The FLARE Approach

To adapt to the target language, we use LoRA adapters inserted into the transformer's attention modules, leaving the original model weights frozen.<br>
Because labeled data in the target language is scarce, we machine-translate the English training set using NLLB 3.3B.

<div style="text-align:center;margin:1.5em 0;">
  <img src="assets/img/project_flare/flare_slides.png" alt="Overview FLARE forward pass" style="width:300px;max-width:95vw;border-radius:0.6em;border:1.5px solid #e5e5e5;box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
  <div style="color:#789;font-size:0.93em;">(Figure: Adapter and translation setup)</div>
</div>

FLARE takes both the source and translated target text as input. For each forward pass, it does the following:

1. Runs a forward pass on the source language input to get strong English representations, which are fed into the LoRA adapter.
2. Processes the translated target language input in the regular forward pass, with target language representations also passed through the adapter.
3. <b>Within the adapter bottleneck, FLARE merges the source and target representations.</b> This fused representation continues up to the next transformer layer.
4. The process repeats for all layers.

<div style="text-align:center;margin:1.5em 0;">
  <img src="assets/img/project_flare/fusion.png" alt="Fusion Process in Adapters" style="width:450px;max-width:95vw;border-radius:0.6em;border:1.5px solid #e5e5e5;box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
  <div style="color:#789;font-size:0.93em;">(Figure: Fusion process in adapters)</div>
</div>


---

### FLARE-MT: Making It Even More Efficient

The FLARE-MT variant skips the full forward pass on the source language input.  
Instead, it generates a <b>latent translation</b> using just the NLLB encoder and fuses this into every transformer layer in the main model.

<div style="text-align:center;margin:1.5em 0;">
  <img src="assets/img/project_flare/flaremt_slides.png" alt="FLARE-MT Variant" style="width:350px;max-width:95vw;border-radius:0.6em;border:1.5px solid #e5e5e5;box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
  <div style="color:#789;font-size:0.93em;">(Figure: FLARE-MT variant, using latent translation)</div>
</div>

---

### Results

FLARE is the <b>best performing translate-train method</b> in our experiments.

<div style="text-align:center;margin:1.5em 0;">
  <img src="assets/img/project_flare/results_avg_rank.png" alt="Translate-Train Results" style="width:400px;max-width:98vw;border-radius:0.6em;border:1.5px solid #e5e5e5;box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
  <div style="color:#789;font-size:0.93em;">(Figure: Average rank for translate-train methods)</div>
</div>
 
FLARE also outperforms other translate-test and zero-shot baselines:

<div style="display:flex;justify-content:center;gap:1em;margin:1.5em 0;flex-wrap:wrap;text-align:center;">
  
  <div>
    <img src="assets/img/project_flare/results_all_xnli.png" 
         alt="Detailed Results Table" 
         style="width:280px;max-width:95vw;border-radius:0.6em;border:1.5px solid #e5e5e5;
                box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
    <div style="color:#789;font-size:0.93em;">(Cross-lingual transfer results XNLI)</div>
  </div>

  <div>
    <img src="assets/img/project_flare/results_all_tydiqa.png" 
         alt="Cross-lingual transfer results XNLI" 
         style="width:280px;max-width:95vw;border-radius:0.6em;border:1.5px solid #e5e5e5;
                box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
    <div style="color:#789;font-size:0.93em;">(Cross-lingual transfer results TyDiQA)</div>
  </div>

  <div>
    <img src="assets/img/project_flare/results_all_nusax.png" 
         alt="Transfer Results" 
         style="width:280px;max-width:95vw;border-radius:0.6em;border:1.5px solid #e5e5e5;
                box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
    <div style="color:#789;font-size:0.93em;">(Cross-lingual transfer results NusaX)</div>
  </div>

</div>


<!-- 

<div style="text-align:center;margin:1.5em 0;">
  <img src="assets/img/project_flare/results_all_xnli.png" alt="Detailed Results Table" style="width:430px;max-width:99vw;border-radius:0.6em;border:1.5px solid #e5e5e5;box-shadow:0 2px 8px 0 rgba(60,60,80,0.06);background:#fafbfc;">
  <div style="color:#789;font-size:0.93em;">(Table: Detailed results across languages/tasks)</div>
</div> -->

For more details, ablation studies, and deeper analysis, check out the <a href="https://arxiv.org/abs/2501.06892" target="_blank">paper on arXiv</a>!

---