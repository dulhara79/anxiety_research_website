import ResearchHero from '../components/ResearchHero'
import MultimodalStory from '../components/MultimodalStory'
import AiConceptGallery from '../components/AiConceptGallery'
import ValidationGate from '../components/ValidationGate'
import FusionStage from '../components/FusionStage'
import CurrentForecastSplit from '../components/CurrentForecastSplit'
import AudienceProjection from '../components/AudienceProjection'
import EvidenceLedger from '../components/EvidenceLedger'
import ResearchArtifactGallery from '../components/ResearchArtifactGallery'
import SectionChapter from '../components/SectionChapter'
import { components } from '../data/researchData'
import { evidenceRecords } from '../data/evidenceData'
import { currentAssessment, physiologicalForecast } from '../data/systemStatus'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="home-page">
      <ResearchHero/>

      <section className="research-problem shell">
        <SectionChapter index="01" label="RESEARCH THESIS" title="One person. Multiple signals. Different clocks.">
          <p>Anxiety-related change can be reflected across physiological, behavioural, clinical-language and contextual evidence, but those streams are not interchangeable and do not deserve equal influence by default.</p>
        </SectionChapter>
        <div className="timescale-ruler" aria-label="Conceptual modality timescale comparison">
          <span><b>C1</b><i className="fast"/></span>
          <span><b>C2</b><i className="slow"/></span>
          <span><b>C3</b><i className="event"/></span>
          <span><b>C4</b><i className="static"/></span>
        </div>
      </section>

      <MultimodalStory/>
      <AiConceptGallery/>
      <ValidationGate components={components}/>
      <FusionStage/>
      <CurrentForecastSplit assessment={currentAssessment} forecast={physiologicalForecast}/>
      <AudienceProjection/>

      <section className="home-evidence">
        <div className="shell">
          <SectionChapter index="07" label="EVIDENCE RECORD" title="Metrics remain attached to the setting that produced them.">
            <p>Evidence is presented with evaluation context, current eligibility and limitations rather than isolated promotional numbers.</p>
          </SectionChapter>
          <EvidenceLedger records={evidenceRecords}/>
          <Link className="text-link" to="/evidence">Open the full evidence record <ArrowRight size={14}/></Link>
        </div>
      </section>

      <ResearchArtifactGallery/>

      <section className="closing-manifesto shell">
        <span>09 / RESEARCH RECORD</span>
        <h2>A public research record should make uncertainty easier to inspect, not easier to hide.</h2>
        <div>
          <Link to="/methodology">Methodology <ArrowRight size={14}/></Link>
          <Link to="/system">Current / target architecture <ArrowRight size={14}/></Link>
          <Link to="/documents">Documents <ArrowRight size={14}/></Link>
        </div>
      </section>
    </main>
  )
}
