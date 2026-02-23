import { Link } from 'react-router-dom'
import { packages } from '../../data/packages'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import PackageCard from '../ui/PackageCard'

export default function PackagesPreviewSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Packages"
            title="Transparent Packages for Different Business Stages"
            description="Choose the scope that matches your current goals, then scale as your business grows."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.slice(0, 3).map((pack, index) => (
            <Reveal key={pack.id} delay={index * 0.05}>
              <PackageCard pack={pack} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link to="/packages" className="inline-flex text-sm font-semibold text-orange-300">
            View All Packages &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

