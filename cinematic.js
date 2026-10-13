'use strict';
(() => {
  const stage = document.querySelector('.craft-stage');
  const code = document.querySelector('#craft-code');
  const snippets = [
    {file:'experience.dart',label:'DART / FLUTTER',source:code.textContent},
    {file:'Experience.swift',label:'SWIFT / iOS',source:`struct Experience: View {
  var body: some View {
    VStack(spacing: 24) {
      ProductHeader()
      JourneyView()
      PrimaryAction()
    }
    .animation(.smooth, value: state)
  }
}`},
    {file:'Experience.kt',label:'KOTLIN / ANDROID',source:`@Composable
fun Experience() {
  MaterialTheme {
    Column {
      ProductHeader()
      JourneyView()
      PrimaryAction()
    }
  }
}`}
  ];
  let snippetIndex = 0;
  function selectSnippet() {
    document.querySelector('.editor-bar span:nth-child(2)').textContent = snippets[snippetIndex].file;
    document.querySelector('.editor-footer span:first-child').textContent = snippets[snippetIndex].label;
    stage.dataset.language = snippets[snippetIndex].label;
  }
  const pause = document.querySelector('#motion-toggle');
  const replay = document.querySelector('#replay-sequence');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, frame = 0, elapsed = 0, last = 0, running = false;
  const phases = {write:['01 / WRITE','DESIGNING EXPERIENCE','Every interaction starts with intent.'],assemble:['02 / ASSEMBLE','COMPOSING INTERFACE','Logic becomes an experience.'],release:['03 / RELEASE','BUILD COMPLETE','An idea, made real.']};
  function render() {
    const phase = elapsed < 3900 ? 'write' : elapsed < 6600 ? 'assemble' : 'release';
    stage.dataset.phase = phase;
    document.querySelector('#scene-number').textContent = phases[phase][0];
    document.querySelector('#build-state').textContent = phases[phase][1];
    document.querySelector('#stage-note').textContent = phases[phase][2];
    const source = snippets[snippetIndex].source;
    code.textContent = source.slice(0, Math.min(source.length, Math.floor(elapsed / 3500 * source.length)));
  }
  function tick(now) {
    if (paused || !running || document.hidden) return;
    if (last) elapsed += now-last;
    last = now; render();
    if(elapsed >= 11000) { snippetIndex = (snippetIndex + 1) % snippets.length; start(); }
    else frame = requestAnimationFrame(tick);
  }
  function start() {
    cancelAnimationFrame(frame); elapsed=0;last=0;running=true;
    stage.classList.remove('is-running'); void stage.offsetWidth;
    selectSnippet(); stage.classList.add('is-running'); render(); frame=requestAnimationFrame(tick);
  }
  function setPaused(value) {
    paused=value;document.body.classList.toggle('motion-paused',paused);
    pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Enable motion':'Pause motion';
    cancelAnimationFrame(frame);last=0;
    if(!paused&&running) frame=requestAnimationFrame(tick);
  }
  pause.addEventListener('click',()=>{setPaused(!paused);if(!paused&&!running)start();});
  replay.addEventListener('click',()=>{setPaused(false);start();});
  reduced.addEventListener('change',()=>{setPaused(reduced.matches);if(reduced.matches){elapsed=8500;running=false;render();stage.classList.remove('is-running');}else if(!running){start();}});
  document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);last=0;if(!document.hidden&&!paused&&running)frame=requestAnimationFrame(tick);});
  selectSnippet();
  if(reduced.matches){setPaused(true);elapsed=8500;render();}else start();
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.project,.section-head,.experience article,.services article').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});
  if(matchMedia('(pointer:fine)').matches){document.querySelectorAll('.project-art').forEach(el=>{
    el.addEventListener('pointermove',e=>{if(paused||reduced.matches)return;const r=el.getBoundingClientRect();el.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*5}deg`);el.style.setProperty('--rx',`${-((e.clientY-r.top)/r.height-.5)*5}deg`);});
    el.addEventListener('pointerleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg');});
  });}
})();
