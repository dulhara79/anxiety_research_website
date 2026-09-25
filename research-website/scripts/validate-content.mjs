import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const src = path.join(root, 'src');
const files = [];

function collect(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const name of fs.readdirSync(target)) collect(path.join(target, name));
    return;
  }
  if (/\.(js|jsx|css|html|svg)$/.test(target)) files.push(target);
}

collect(src);
collect(path.resolve('public/media/context-longitudinal-field.svg'));
collect(path.resolve('public/media/context-diagonal-image.svg'));
collect(path.resolve('tailwind.config.js'));
collect(path.resolve('index.html'));
collect(path.resolve('package.json'));
const text = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');

const requiredFiles = [
  'src/data/components.js','src/data/literature.js','src/data/findings.js','src/data/documents.js','src/data/publications.js','src/data/timeline.js','src/data/people.js','src/data/architecture.js',
  'src/components/hero/ResearchHero.jsx','src/components/hero/HeroMedia.jsx','src/components/hero/AnimatedHeading.jsx',
  'src/components/story/AnxietyContext.jsx','src/components/story/ObservationTimeline.jsx','src/components/story/SnapshotProblem.jsx','src/components/story/LiteratureLandscape.jsx','src/components/story/ResearchGap.jsx','src/components/story/ResearchThesis.jsx',
  'src/components/research/ModalityOverview.jsx','src/components/research/ComponentsStory.jsx','src/components/research/FusionStory.jsx','src/components/research/ArchitectureStory.jsx','src/components/research/CurrentForecastSplit.jsx',
  'src/components/evidence/FindingsPreview.jsx','src/components/documents/DocumentCollection.jsx','src/components/team/ResearchTeam.jsx','src/components/motion/MotionReveal.jsx','src/components/motion/TextReveal.jsx','src/hooks/useSectionNavigation.js',
  'public/media/context-longitudinal-field.svg',
  'src/components/media/DiagonalMediaBand.jsx',
  'src/components/three/SpatialCanvas.jsx','src/components/three/SpatialSceneBoundary.jsx','src/components/three/SpatialErrorBoundary.jsx','src/components/three/SceneFallback.jsx','src/components/three/spatialQuality.js',
  'src/components/three/HeroSpatialField.jsx','src/components/three/LongitudinalField3D.jsx','src/components/three/TimescaleScene.jsx','src/components/three/ModalityScene.jsx','src/components/three/ComponentScene.jsx','src/components/three/FusionScene.jsx','src/components/three/ArchitectureScene.jsx'
];

const absentFiles = requiredFiles.filter((file) => !fs.existsSync(path.resolve(file)));
const forbidden = [
  'images.unsplash.com','pexels.com','Plus Jakarta Sans','Outfit','JetBrains Mono','Adaptive Intervention Engine','KNN BallTree','grad-multi','float-badge','ring-glow','glow-blue','glow-teal','glow-violet','spin-slow','pulse-soft','flow.google.com/project/','flow.google.com/shared/video/','!failed && !reduced && <video','loop={!reduced}','const SEAMLESS_LOOP_FADE_SECONDS = 1\n','viewport={{ once: true','<OrbitControls','is overall patient risk','means zero risk',
  'imageSrc="/media/context-diagonal-image.svg"','scene={TimescaleScene}'
];
const required = [
  'Understanding anxiety beyond a single moment.','Anxiety is not a single moment.','What we can observe is only part of the picture.','GLOBEM','CARE-AnxRAG','0.5205','TC-WPN','Active fusion weight 0.0','Clinical NLP signal','not overall patient risk','insufficient evidence','CURRENT','FORWARD','/media/research-hero.mp4','prefers-reduced-motion','whileHover','whileInView','layoutId="nav-active-indicator"','scrollIntoView','data-media-state','onLoadedData','SEAMLESS_LOOP_FADE_SECONDS','motion.video','onTimeUpdate','seamless-video-layer','activeLayer','transitioningRef','HERO_PLAYBACK_RATE = 0.3','LOOP_START_SECONDS','LOOP_END_TRIM_SECONDS','video.playbackRate = HERO_PLAYBACK_RATE','fadeMediaSeconds','loopEnd','hero-heading-safe','nav-shell--compact','SCROLL_COMPACT_THRESHOLD','useScroll','useMotionValueEvent','layout="position"','context-longitudinal-art','contextWaveGradient','context-observation-node','context-visual-wrap','context-wave-path','context-section-endcap','context-art-anchor','text-reveal--eyebrow','text-reveal--heading','text-reveal--body','viewport={{ once: false','data-text-reveal',
  '@react-three/fiber','@react-three/drei','SpatialSceneBoundary','SceneFallback','React.lazy','hero-spatial-layer','fallbackVariant="fusion"','fallbackVariant="architecture"','physiology','behaviour','clinical','context','strong','stale','incomplete','unavailable','excluded','Participant','Signals','Component models','Canonical backend state','Quality / eligibility checks','Reliability-aware fusion','Current research assessment','Evidence support','Audience-specific interfaces',
  'DiagonalMediaBand','variant="context"','variant="timescale"','variant="modality"','variant="component"','variant="fusion"','variant="architecture"','diagonal-media-band','diagonal-media-band--context','diagonal-media-band--timescale','diagonal-media-band--modality','diagonal-media-band--component','diagonal-media-band--fusion','diagonal-media-band--architecture','clip-path:polygon(',
  'context-full-width-polygon','clip-path:polygon(0 100%,100% 24%,100% 100%)','context-clean-band','observation-clean-band'
];

const bad = forbidden.filter((term) => text.includes(term));
const missing = required.filter((term) => !text.includes(term));

if (absentFiles.length || bad.length || missing.length) {
  console.error('Content/design validation failed', { absentFiles, bad, missing });
  process.exit(1);
}

console.log('Research content/design validation passed.');
