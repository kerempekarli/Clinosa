/* global React */
const { useEffect } = React;

const TWEAK_DEFAULTS_V4 = /*EDITMODE-BEGIN*/{
  "accent": "violet",
  "rotateWord": true,
  "showGrid": true,
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENTS_V4 = {
  violet:    { h: 285, label: "Violet (default)" },
  electric:  { h: 265, label: "Electric blue" },
  cyan:      { h: 210, label: "Cyan" },
  emerald:   { h: 155, label: "Emerald" },
  magenta:   { h: 330, label: "Magenta" }
};

function applyTweaksV4(t) {
  const r = document.documentElement;
  const a = ACCENTS_V4[t.accent] || ACCENTS_V4.violet;
  r.style.setProperty('--accent-h', String(a.h));

  // grid toggle
  const grid = document.querySelector('.hero-grid');
  if (grid) grid.style.display = t.showGrid ? '' : 'none';

  // rotating word — pause vs animate
  const track = document.querySelector('.rot-track');
  if (track) {
    track.style.animationPlayState = t.rotateWord ? 'running' : 'paused';
    if (!t.rotateWord) track.style.transform = 'translateY(0)';
    else track.style.transform = '';
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

function ClinosaTweaksV4() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS_V4);
  useEffect(() => { applyTweaksV4(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent hue">
        <TweakSelect
          label="Color"
          value={t.accent}
          options={Object.keys(ACCENTS_V4)}
          onChange={(v) => setTweak('accent', v)}
        />
      </TweakSection>
      <TweakSection label="Hero">
        <TweakToggle
          label="Rotating word"
          value={t.rotateWord}
          onChange={(v) => setTweak('rotateWord', v)}
        />
        <TweakToggle
          label="Grid background"
          value={t.showGrid}
          onChange={(v) => setTweak('showGrid', v)}
        />
      </TweakSection>
      <TweakSection label="Layout">
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

const tweakRootV4 = document.createElement('div');
document.body.appendChild(tweakRootV4);
ReactDOM.createRoot(tweakRootV4).render(<ClinosaTweaksV4 />);
