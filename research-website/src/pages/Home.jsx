import ResearchHero from '../components/ResearchHero'
import MultimodalStory from '../components/MultimodalStory'
import ValidationGate from '../components/ValidationGate'
import FusionStage from '../components/FusionStage'
import CurrentForecastSplit from '../components/CurrentForecastSplit'
import AudienceProjection from '../components/AudienceProjection'
import EvidenceLedger from '../components/EvidenceLedger'
import ResearchArtifactGallery from '../components/ResearchArtifactGallery'
import AiConceptGallery from '../components/AiConceptGallery'

import { components } from '../data/researchData'
import { evidenceRecords } from '../data/evidenceData'
import {
  currentAssessment,
  physiologicalForecast,
} from '../data/systemStatus'

export default function Home() {
  return (
    <main className="exact-home">
      <ResearchHero />

      <MultimodalStory />

      <ValidationGate components={components} />

      <FusionStage />

      <CurrentForecastSplit
        assessment={currentAssessment}
        forecast={physiologicalForecast}
      />

      <AudienceProjection />

      <AiConceptGallery />

      <section className="exact-existing-evidence">
        <EvidenceLedger records={evidenceRecords} />
      </section>

      <ResearchArtifactGallery />
    </main>
  )
}
