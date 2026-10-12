/* global React */
const { useEffect } = React;

const TWEAK_DEFAULTS_V5 = /*EDITMODE-BEGIN*/{
  "accent": "clinical",
  "rotateWord": true,
  "showGrid": true,
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENTS_V5 = {
  clinical: { h: 152, label: "Clinical green (default)" },
  forest:   { h: 145, label: "Forest" },
  emerald:  { h: 160, label: "Emerald" },
  lime:     { h: 130, label: "Lime" },
  teal:     { h: 175, label: "Teal" }
};

function applyTweaksV5(t) {
  const r = document.documentElement;
  const a = ACCENTS_V5[t.accent] || ACCENTS_V5.clinical;
  r.style.setProperty('--accent-h', String(a.h));

  const grid = document.querySelector('.hero-grid');
  if (grid) grid.style.display = t.showGrid ? '' : 'none';

  const track = document.querySelector('.rot-track');
  if (track) {
    track.style.animationPlayState = t.rotateWord ? 'running' : 'paused';
    if (!t.rotateWord) track.style.transform = 'translateY(0)';
    else track.style.transform = '';
  }

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

function ClinosaTweaksV5() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS_V5);
  useEffect(() => { applyTweaksV5(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent hue">
        <TweakSelect
          label="Green"
          value={t.accent}
          options={Object.keys(ACCENTS_V5)}
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

const tweakRootV5 = document.createElement('div');
document.body.appendChild(tweakRootV5);
ReactDOM.createRoot(tweakRootV5).render(<ClinosaTweaksV5 />);
