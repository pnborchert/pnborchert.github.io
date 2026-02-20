---
layout: default
---

<section class="hero">
  <div class="hero__photo-wrap">
    <div class="hero__photo-ring"></div>
    <img src="assets/img/profile.jpeg" alt="Philipp Borchert" class="hero__photo" />
  </div>

  <div class="hero__content">
    <h1 class="hero__name">Philipp Borchert</h1>
    <p class="hero__tagline">Reasoning · AI for Math · Multilingual NLP</p>
  
    <p class="hero__bio">
      I'm a <b>Research Scientist</b> fascinated by how we can teach LLMs to reason and tackle complex problems.
      My research spans from multilingual NLP over information extraction to my current work on reasoning in AI for Math at Huawei in London.
      I completed my PhD at KU Leuven, where my research focused on multilinguality and NLP for Business applications.
    </p>
  
    <div class="hero__socials">
      <a href="https://github.com/pnborchert" target="_blank" class="hero__social-link">
        {% include icons/github.html %}
        GitHub
      </a>
      <!-- <a href="https://huggingface.co/pborchert" target="_blank" class="hero__social-link">🤗 HuggingFace</a> -->
      <a href="https://www.linkedin.com/in/pborchert/" target="_blank" class="hero__social-link">
        {% include icons/linkedin.html %}
        LinkedIn
      </a>
      <a href="https://scholar.google.com/citations?user=efKKfygAAAAJ" target="_blank" class="hero__social-link">
        {% include icons/scholar.html %}
        Google Scholar
      </a>
    </div>
  
    <div class="hero__search-container">
      <div class="hero__search-label">What excites me</div>
      <div class="hero__search-bar">
        <!-- SVG Search Icon -->
        <svg class="hero__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <span id="typing-animation" class="typing-text"></span><span id="typing-cursor" class="typing-cursor"></span>
      </div>
    </div>
  </div>
</section>

<canvas id="nodes-canvas" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;"></canvas>

<script src="assets/js/nodes.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function() {
  const phrases = [
    "Research",
    "Multilingual NLP",
    "AI for Math",
    "Building with LLMs",
    "Open Source",
    "Running",
    "Cycling",
    "Coffee",
  ];
  let currentPhrase = 0;
  let currentChar = 0;
  let typing = true;
  const element = document.getElementById("typing-animation");
  const cursor = document.getElementById("typing-cursor");

  function typeLoop() {
    let phrase = phrases[currentPhrase];
    if (typing) {
      if (currentChar <= phrase.length) {
        element.textContent = phrase.substring(0, currentChar);
        currentChar++;
        setTimeout(typeLoop, 120);
      } else {
        typing = false;
        setTimeout(typeLoop, 2000);
      }
    } else {
      if (currentChar > 0) {
        element.textContent = phrase.substring(0, currentChar - 1);
        currentChar--;
        setTimeout(typeLoop, 50);
      } else {
        typing = true;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(typeLoop, 700);
      }
    }
  }
  typeLoop();
});
</script>

<!-- Spacer -->
<div style="height: 6rem;"></div>

<h2 class="section-title">Selected Publications & Projects</h2>

<div class="pub-grid">

  <article class="pub-card">
    <div class="pub-card__venue">Open Source Project</div>
    <div class="pub-card__title">
      <a href="https://github.com/Formal-Math-Reasoning/leanflow">LeanFlow</a>
    </div>
    <div class="pub-card__authors"><u>Philipp Borchert</u>, Meiru Zhang, Matias Raimundez, Jasivan Alex Sivakumar, Yupei Li, Gerasimos Lampouras</div>
    <div class="pub-card__desc">
      A fast, scalable, and easy-to-use Python interface to Lean 4. LeanFlow lets you run Lean code, interact with proofs, and evaluate formal statements directly from Python.
    </div>
    <div class="pub-card__links">
      <a href="https://github.com/Formal-Math-Reasoning/leanflow" target="_blank" class="pub-link pub-link--github">
        {% include icons/github.html %} GitHub
      </a>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-card__venue">Preprint</div>
    <div class="pub-card__title">
      <a href="https://arxiv.org/abs/2510.11986">Conjecturing: An Overlooked Step in Formal Mathematical Reasoning</a>
    </div>
    <div class="pub-card__authors">Jasivan Alex Sivakumar, <u>Philipp Borchert</u>, Ronald Cardenas, Gerasimos Lampouras</div>
    <div class="pub-card__desc">
      We identify conjecturing as a critical bottleneck in formal mathematical reasoning. We introduce ConjectureBench and LEAN-FIRE, an inference-time method that improves autoformalisation.
    </div>
    <div class="pub-card__links">
      <a href="https://arxiv.org/abs/2510.11986" target="_blank" class="pub-link pub-link--arxiv">{% include icons/arxiv.html %} ArXiv</a>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-card__venue">Preprint</div>
    <div class="pub-card__title">
      <a href="https://arxiv.org/abs/2510.11944">TopoAlign: A Framework for Aligning Code to Math via Topological Decomposition</a>
    </div>
    <div class="pub-card__authors">Yupei Li*, <u>Philipp Borchert</u>*, Gerasimos Lampouras</div>
    <div class="pub-card__desc">
      TopoAlign addresses data scarcity for Math LLMs by aligning code to mathematical structures, improving performance on MiniF2F and ProofNet benchmarks.
    </div>
    <div class="pub-card__links">
      <a href="https://arxiv.org/abs/2510.11944" target="_blank" class="pub-link pub-link--arxiv">{% include icons/arxiv.html %} ArXiv</a>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-card__venue">ICLR 2026 · Rio de Janeiro</div>
    <div class="pub-card__title">
      <a href="https://arxiv.org/abs/2510.10815">DRIFT: Decompose, Retrieve, Illustrate, then Formalize Theorems</a>
    </div>
    <div class="pub-card__authors">Meiru Zhang, <u>Philipp Borchert</u>, Milan Gritta, Gerasimos Lampouras</div>
    <div class="pub-card__desc">
      DRIFT decomposes informal statements, retrieves dependent premises, and selects illustrative examples before formalization, achieving state-of-the-art on ProofNet.
    </div>
    <div class="pub-card__links">
      <a href="https://arxiv.org/abs/2510.10815" target="_blank" class="pub-link pub-link--arxiv">{% include icons/arxiv.html %} ArXiv</a>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-card__venue">ACL 2025 · Vienna </div>
    <div class="pub-card__title">
      <a href="./project_flare.html">Language Fusion for Parameter-Efficient Cross-lingual Transfer</a>
    </div>
    <div class="pub-card__authors"><u>Philipp Borchert</u>, Ivan Vulić, Marie-Francine Moens, Jochen De Weerdt</div>
    <div class="pub-card__desc">
      FLARE fuses source and target language representations within low-rank adapters, enhancing cross-lingual transfer while maintaining parameter efficiency.
    </div>
    <div class="pub-card__links">
      <a href="https://arxiv.org/abs/2501.06892" target="_blank" class="pub-link pub-link--arxiv">{% include icons/arxiv.html %} ArXiv</a>
      <a href="https://github.com/pnborchert/FLARE" target="_blank" class="pub-link pub-link--github">{% include icons/github.html %} GitHub</a>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-card__venue">EMNLP (Findings) 2024 · Miami </div>
    <div class="pub-card__title">
      <a href="https://arxiv.org/abs/2406.12739">Self-Distillation for Model Stacking Unlocks Cross-Lingual NLU in 200+ Languages</a>
    </div>
    <div class="pub-card__authors">Fabian David Schmidt, <u>Philipp Borchert</u>, Ivan Vulić, Goran Glavaš</div>
    <div class="pub-card__desc">
      MT-LLM integrates machine translation encoders into LLM backbones using self-distillation, unlocking NLU capabilities for over 127 languages.
    </div>
    <div class="pub-card__links">
      <a href="https://arxiv.org/abs/2406.12739" target="_blank" class="pub-link pub-link--arxiv">{% include icons/arxiv.html %} ArXiv</a>
      <a href="https://github.com/fdschmidt93/trident-nllb-llm2vec" target="_blank" class="pub-link pub-link--github">{% include icons/github.html %} GitHub</a>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-card__venue">NAACL 2024 · Mexico City </div>
    <div class="pub-card__title">
      <a href="https://arxiv.org/abs/2403.16543">Efficient Information Extraction in Few-Shot Relation Classification</a>
    </div>
    <div class="pub-card__authors"><u>Philipp Borchert</u>, Jochen De Weerdt, Marie-Francine Moens</div>
    <div class="pub-card__desc">
      MultiRep improves few-shot relation classification by combining multiple sentence representations using contrastive learning.
    </div>
    <div class="pub-card__links">
      <a href="https://arxiv.org/abs/2403.16543" target="_blank" class="pub-link pub-link--arxiv">{% include icons/arxiv.html %} ArXiv</a>
      <a href="https://github.com/pnborchert/MultiRep" target="_blank" class="pub-link pub-link--github">{% include icons/github.html %} GitHub</a>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-card__venue">EMNLP 2023 · Singapore </div>
    <div class="pub-card__title">
      <a href="https://arxiv.org/abs/2310.12024">CORE: A Few-Shot Company Relation Classification Dataset</a>
    </div>
    <div class="pub-card__authors"><u>Philipp Borchert</u>, Jochen De Weerdt, Kristof Coussement, Arno De Caigny, Marie-Francine Moens</div>
    <div class="pub-card__desc">
      CORE is a dataset for few-shot relation classification focused on company relations, challenging models with high contextual complexity.
    </div>
    <div class="pub-card__links">
      <a href="https://arxiv.org/abs/2310.12024" target="_blank" class="pub-link pub-link--arxiv">{% include icons/arxiv.html %} ArXiv</a>
      <a href="https://github.com/pnborchert/CORE" target="_blank" class="pub-link pub-link--github">{% include icons/github.html %} GitHub</a>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-card__venue">EMNLP 2023 · Singapore </div>
    <div class="pub-card__title">
      <a href="https://arxiv.org/abs/2310.10310">Investigating Bias in Multilingual Language Models</a>
    </div>
    <div class="pub-card__authors">Manon Reusens, <u>Philipp Borchert</u>, Margot Mieskes, Jochen De Weerdt, Bart Baesens</div>
    <div class="pub-card__desc">
      This study investigates whether debiasing techniques can be effectively transferred across different languages within multilingual LLMs.
    </div>
    <div class="pub-card__links">
      <a href="https://arxiv.org/abs/2310.10310" target="_blank" class="pub-link pub-link--arxiv">{% include icons/arxiv.html %} ArXiv</a>
      <a href="https://github.com/manon-reusens/multilingual_bias" target="_blank" class="pub-link pub-link--github">{% include icons/github.html %} GitHub</a>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-card__venue">EMNLP 2023 · Singapore </div>
    <div class="pub-card__title">
      <a href="https://arxiv.org/abs/2310.06675">SEER: A Knapsack approach to Exemplar Selection</a>
    </div>
    <div class="pub-card__authors">Jonathan Tonglet, Manon Reusens, <u>Philipp Borchert</u>, Bart Baesens</div>
    <div class="pub-card__desc">
      SEER introduces a novel method for selecting diverse and representative examples for in-context learning in complex QA tasks.
    </div>
    <div class="pub-card__links">
      <a href="https://arxiv.org/abs/2310.06675" target="_blank" class="pub-link pub-link--arxiv">{% include icons/arxiv.html %} ArXiv</a>
      <a href="https://github.com/jtonglet/SEER" target="_blank" class="pub-link pub-link--github">{% include icons/github.html %} GitHub</a>
    </div>
  </article>

</div>

<script>
// Spotlight Effect Script
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.pub-card'); // Target ALL cards
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});
</script>