/* global React */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#5BDDCB",
  "density": "comfortable",
  "showChip": true
}/*EDITMODE-END*/;

// Map hex -> hue used in our oklch system. Curated, calm clinical palette.
const ACCENT_HUES = {
  "#5BDDCB": 180, // Clinical teal (default)
  "#5DD39E": 155, // Forest green
  "#7AB8FF": 245, // Cobalt
  "#D7C77A":  85  // Sage amber
};

function applyTweaks(t) {
  const root = document.documentElement;
  const hue = ACCENT_HUES[t.accent] ?? 180;
  root.style.setProperty('--accent', `oklch(0.78 0.10 ${hue})`);
  root.style.setProperty('--accent-2', `oklch(0.86 0.06 ${hue})`);
  const dark = hue > 60 && hue < 220;
  root.style.setProperty('--accent-ink', dark ? `oklch(0.18 0.04 ${hue + 20})` : `oklch(0.96 0.01 240)`);
  root.style.setProperty('--accent-soft', `oklch(0.30 0.04 ${hue} / 0.30)`);

  root.style.setProperty('--maxw', t.density === 'compact' ? '1120px' : '1200px');
  document.body.style.fontSize = t.density === 'compact' ? '15px' : '16px';

  const chip = document.querySelector('.hero-chip');
  if (chip) chip.style.display = t.showChip ? '' : 'none';
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
          options={Object.keys(ACCENT_HUES)}
          onChange={(v) => setTweak('accent', v)}
        />
      </TweakSection>
      <TweakSection label="Layout">
        <TweakRadio
          label="Density"
          value={t.density}
          options={['comfortable', 'compact']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakToggle
          label="Floating AI chip"
          value={t.showChip}
          onChange={(v) => setTweak('showChip', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const tweakRoot = document.createElement('div');
document.body.appendChild(tweakRoot);
ReactDOM.createRoot(tweakRoot).render(<ClinosaTweaks />);
