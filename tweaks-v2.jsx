/* global React */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#2FB8AA",
  "vibe": "warm",
  "showPaws": true
}/*EDITMODE-END*/;

const PRIMARIES = {
  "#2FB8AA": { hue: 180, label: "Teal" },     // default clinical teal
  "#3DC78F": { hue: 155, label: "Mint" },
  "#5BA7F4": { hue: 245, label: "Sky" },
  "#E08A5B": { hue:  55, label: "Apricot" }
};

function applyTweaks(t) {
  const root = document.documentElement;
  const p = PRIMARIES[t.primary] || PRIMARIES["#2FB8AA"];
  root.style.setProperty('--primary', `oklch(0.62 0.13 ${p.hue})`);
  root.style.setProperty('--primary-2', `oklch(0.55 0.13 ${p.hue})`);
  root.style.setProperty('--primary-soft', `oklch(0.93 0.04 ${p.hue})`);

  // vibe — adjusts background tint and bg radial colors
  if (t.vibe === 'cool') {
    root.style.setProperty('--bg', 'oklch(0.985 0.005 230)');
    root.style.setProperty('--bg-2', 'oklch(0.965 0.008 230)');
    root.style.setProperty('--surface-2', 'oklch(0.97 0.005 230)');
  } else if (t.vibe === 'cream') {
    root.style.setProperty('--bg', 'oklch(0.98 0.018 80)');
    root.style.setProperty('--bg-2', 'oklch(0.96 0.022 80)');
    root.style.setProperty('--surface-2', 'oklch(0.96 0.018 80)');
  } else {
    root.style.setProperty('--bg', 'oklch(0.985 0.008 80)');
    root.style.setProperty('--bg-2', 'oklch(0.965 0.012 80)');
    root.style.setProperty('--surface-2', 'oklch(0.97 0.008 80)');
  }

  // paw scatter
  const paws = document.querySelector('.paw-scatter');
  if (paws) paws.style.display = t.showPaws ? '' : 'none';
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
      <TweakSection label="Brand">
        <TweakColor
          label="Primary"
          value={t.primary}
          options={Object.keys(PRIMARIES)}
          onChange={(v) => setTweak('primary', v)}
        />
      </TweakSection>
      <TweakSection label="Vibe">
        <TweakRadio
          label="Background"
          value={t.vibe}
          options={['warm', 'cool', 'cream']}
          onChange={(v) => setTweak('vibe', v)}
        />
        <TweakToggle
          label="Paw scatter"
          value={t.showPaws}
          onChange={(v) => setTweak('showPaws', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const tweakRoot = document.createElement('div');
document.body.appendChild(tweakRoot);
ReactDOM.createRoot(tweakRoot).render(<ClinosaTweaks />);
