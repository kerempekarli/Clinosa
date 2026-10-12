/* global React */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3F8FB5",
  "tone": "navy",
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENTS = {
  "#3F8FB5": { hue: 215, label: "Teal-blue (default)" },
  "#2E7E7B": { hue: 195, label: "Clinical teal" },
  "#3F65C8": { hue: 245, label: "Indigo" },
  "#3F8F60": { hue: 165, label: "Pine" }
};

function applyTweaks(t) {
  const r = document.documentElement;
  const a = ACCENTS[t.accent] || ACCENTS["#3F8FB5"];
  r.style.setProperty('--primary', `oklch(0.55 0.13 ${a.hue})`);
  r.style.setProperty('--primary-2', `oklch(0.48 0.14 ${a.hue})`);
  r.style.setProperty('--primary-3', `oklch(0.65 0.12 ${a.hue})`);
  r.style.setProperty('--primary-soft', `oklch(0.96 0.025 ${a.hue})`);
  r.style.setProperty('--primary-soft-2', `oklch(0.92 0.04 ${a.hue})`);

  // tone — bg + ink tint
  if (t.tone === 'cool') {
    r.style.setProperty('--bg', 'oklch(0.985 0.004 235)');
    r.style.setProperty('--bg-2', 'oklch(0.97 0.005 235)');
    r.style.setProperty('--ink', 'oklch(0.20 0.025 240)');
  } else if (t.tone === 'graphite') {
    r.style.setProperty('--bg', 'oklch(0.98 0 0)');
    r.style.setProperty('--bg-2', 'oklch(0.965 0 0)');
    r.style.setProperty('--ink', 'oklch(0.20 0.005 240)');
  } else {
    r.style.setProperty('--bg', 'oklch(0.985 0.003 230)');
    r.style.setProperty('--bg-2', 'oklch(0.97 0.005 230)');
    r.style.setProperty('--ink', 'oklch(0.205 0.030 245)');
  }

  // density
  if (t.density === 'compact') {
    r.style.setProperty('--maxw', '1120px');
    r.style.setProperty('--maxw-wide', '1200px');
    document.body.style.fontSize = '15px';
  } else {
    r.style.setProperty('--maxw', '1180px');
    r.style.setProperty('--maxw-wide', '1280px');
    document.body.style.fontSize = '15.5px';
  }
}

function ClinosaTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyTweaks(t); }, [t]);
  useEffect(() => {
    const fn = () => applyTweaks(t);
    window.addEventListener('clinosa-ready', fn);
    return () => window.removeEventListener('clinosa-ready', fn);
  });

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent">
        <TweakColor
          label="Hue"
          value={t.accent}
          options={Object.keys(ACCENTS)}
          onChange={(v) => setTweak('accent', v)}
        />
      </TweakSection>
      <TweakSection label="Surface">
        <TweakRadio
          label="Tone"
          value={t.tone}
          options={['navy', 'cool', 'graphite']}
          onChange={(v) => setTweak('tone', v)}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['comfortable', 'compact']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const tweakRoot = document.createElement('div');
document.body.appendChild(tweakRoot);
ReactDOM.createRoot(tweakRoot).render(<ClinosaTweaks />);
