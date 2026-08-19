import { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import {
  LegalPage,
  LegalSection,
  LegalSubheading,
  LegalList,
  LegalContact,
} from '../../components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing use of the CanCAF website, programmes, content, and services. Version V01-2026, effective 12 August 2026.',
  openGraph: {
    title: 'Terms of Service - CanCAF',
    description:
      'The terms governing use of the CanCAF website, programmes, content, and services.',
  },
}

/**
 * CanCAF Terms of Service
 *
 * Content transcribed from "CANCAF FOUNDATION TERMS OF SERVICE V01".
 * When the source document is revised, update the version and dates in the
 * LegalPage props along with the affected clauses.
 */
export default function TermsPage() {
  return (
    <LegalPage
      tag="Legal"
      title="Terms of Service"
      subtitle="The terms governing your use of the CanCAF website, programmes, and services."
      version="V01-2026"
      effectiveDate="12 August 2026"
      nextReviewDate="11 August 2028"
      intro={
        <>
          <p>
            Welcome to the website of the{' '}
            <strong className="text-zinc-900">Cancer Care Africa Foundation (CanCAF)</strong>{' '}
            (&ldquo;CanCAF,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By
            accessing or using our website, services, programs, content, or resources available
            through cancaf.org, you agree to comply with and be bound by these Terms of Service
            (&ldquo;Terms&rdquo;).
          </p>
          <p>
            If you do not agree with these Terms, please do not use our website or services.
          </p>
        </>
      }
    >
      <LegalSection number={1} heading="About CanCAF">
        <p>
          Cancer Care Africa Foundation (CanCAF) is a non-profit organization dedicated to
          strengthening cancer care systems across Africa through:
        </p>
        <LegalList
          items={[
            'Capacity building and workforce development',
            'Cancer awareness and education',
            'Research and knowledge sharing',
            'Advocacy and policy engagement',
            'Strategic partnerships and collaborations',
            'Community outreach initiatives',
            'Professional training and educational programmes',
          ]}
        />
        <p>
          These activities are intended to improve cancer prevention, early detection, diagnosis,
          treatment, survivorship, and palliative care across Africa.
        </p>
      </LegalSection>

      <LegalSection number={2} heading="Acceptance of Terms">
        <p>By accessing or using this website, you confirm that:</p>
        <LegalList
          items={[
            'You are at least 18 years old or have the consent of a parent or legal guardian.',
            'You have the legal authority to enter into these Terms.',
            'You will comply with all applicable laws and regulations.',
          ]}
        />
      </LegalSection>

      <LegalSection number={3} heading="Health Information Disclaimer">
        <p>
          The information provided on this website is intended for educational and informational
          purposes only.
        </p>
        <p>CanCAF does not provide:</p>
        <LegalList
          items={[
            'Medical diagnoses',
            'Personal medical advice',
            'Treatment recommendations',
            'Emergency healthcare services',
          ]}
        />
        <p>
          The content on this website should not replace consultation with qualified healthcare
          professionals.
        </p>
        <p className="font-semibold text-zinc-900">
          If you have a medical concern, diagnosis, or emergency, seek professional medical
          attention immediately.
        </p>
      </LegalSection>

      <LegalSection number={4} heading="Website Content">
        <p>All content published on this website, including but not limited to:</p>
        <LegalList
          items={[
            'Articles',
            'Publications',
            'Reports',
            'Training materials',
            'Videos',
            'Images',
            'Graphics',
            'Logos',
            'Program descriptions',
            'Educational resources',
          ]}
        />
        <p>
          is provided for informational and educational purposes. We reserve the right to modify,
          update, remove, or discontinue any content without prior notice.
        </p>
      </LegalSection>

      <LegalSection number={5} heading="Intellectual Property Rights">
        <p>
          Unless otherwise stated, all intellectual property rights relating to the website and its
          contents are owned by or licensed to CanCAF.
        </p>
        <LegalSubheading>Users may:</LegalSubheading>
        <LegalList
          items={[
            'View website content',
            'Download publicly available materials for personal, educational, and non-commercial use',
          ]}
        />
        <LegalSubheading>Users may not:</LegalSubheading>
        <LegalList
          items={[
            'Reproduce content for commercial purposes',
            'Resell website materials',
            'Modify or create derivative works without permission',
            'Use CanCAF logos, trademarks, or branding without written consent',
          ]}
        />
        <p>Any unauthorized use may violate intellectual property laws.</p>
      </LegalSection>

      <LegalSection number={6} heading="Programme Registrations and Applications">
        <p>CanCAF may offer:</p>
        <LegalList
          items={[
            'Training programmes',
            'Fellowships',
            'Scholarships',
            'Conferences',
            'Workshops',
            'Capacity building initiatives',
            'Volunteer opportunities',
          ]}
        />
        <p>When applying or registering, you agree to:</p>
        <LegalList
          items={[
            'Provide accurate information',
            'Maintain the accuracy of submitted information',
            'Submit only information that you are authorized to provide',
            'Comply with programme requirements and eligibility criteria',
          ]}
        />
        <p>Submission of an application does not guarantee acceptance into a programme.</p>
        <p>
          CanCAF reserves the right to accept, reject, defer, or withdraw programme participation at
          its discretion.
        </p>
      </LegalSection>

      <LegalSection number={7} heading="Donations">
        <p>
          CanCAF may accept donations through its website or designated fundraising platforms.
        </p>
        <p>By making a donation, you acknowledge that:</p>
        <LegalList
          items={[
            'Donations are voluntary.',
            "Funds will be used to support CanCAF's mission and programmes.",
            'Donations are generally non-refundable except where required by law or due to processing errors.',
          ]}
        />
        <p>
          CanCAF reserves the right to decline any donation that may be inconsistent with its
          mission, values, or legal obligations.
        </p>
      </LegalSection>

      <LegalSection number={8} heading="User Conduct">
        <p>You agree not to:</p>
        <LegalList
          items={[
            'Violate any applicable law or regulation',
            'Upload malicious software or harmful code',
            'Attempt unauthorized access to systems or data',
            'Impersonate another individual or organization',
            'Use the website for fraudulent activities',
            'Disrupt website functionality',
            'Publish defamatory, offensive, or unlawful content',
          ]}
        />
        <p>CanCAF reserves the right to restrict access to users who violate these Terms.</p>
      </LegalSection>

      <LegalSection number={9} heading="Third-Party Links">
        <p>
          Our website may include links to third-party websites, organizations, partners, sponsors,
          or service providers.
        </p>
        <p>CanCAF:</p>
        <LegalList
          items={[
            'Does not control third-party websites',
            'Does not guarantee the accuracy of third-party content',
            'Is not responsible for the privacy practices or policies of third parties',
          ]}
        />
        <p>Users access third-party websites at their own risk.</p>
      </LegalSection>

      <LegalSection number={10} heading="Privacy and Data Protection">
        <p>CanCAF is committed to protecting personal information.</p>
        <p>
          Your use of this website is also governed by our{' '}
          <Link href="/privacy" className="text-[#0F766E] font-medium hover:underline">
            Privacy Policy
          </Link>
          , which explains:
        </p>
        <LegalList
          items={[
            'What information we collect',
            'How information is used',
            'Data retention practices',
            'Security measures',
            'User rights regarding personal data',
          ]}
        />
        <p>
          Where applicable, CanCAF seeks to comply with relevant data protection laws, including
          those applicable in jurisdictions in which it operates.
        </p>
      </LegalSection>

      <LegalSection number={11} heading="Volunteers, Partners and Contributors">
        <p>Individuals and organizations participating in CanCAF initiatives as:</p>
        <LegalList
          items={['Volunteers', 'Trainers', 'Speakers', 'Partners', 'Collaborators', 'Contributors']}
        />
        <p>
          must comply with any applicable codes of conduct, programme guidelines, safeguarding
          requirements, and ethical standards established by CanCAF.
        </p>
      </LegalSection>

      <LegalSection number={12} heading="Research, Surveys and Publications">
        <p>
          Participation in research, surveys, studies, assessments, or publications conducted by
          CanCAF is voluntary unless otherwise specified.
        </p>
        <p>
          Where required, informed consent will be obtained before collecting research-related
          information.
        </p>
        <p>
          CanCAF reserves the right to publish aggregated findings that do not personally identify
          participants unless explicit consent is provided.
        </p>
      </LegalSection>

      <LegalSection number={13} heading="Limitation of Liability">
        <p>To the fullest extent permitted by law, CanCAF shall not be liable for:</p>
        <LegalList
          items={[
            'Indirect damages',
            'Consequential damages',
            'Loss of data',
            'Loss of profits',
            'Service interruptions',
            'Website inaccuracies',
            'Reliance on website content',
          ]}
        />
        <p>
          Website services and content are provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis.
        </p>
      </LegalSection>

      <LegalSection number={14} heading="Disclaimer of Warranties">
        <p>CanCAF does not guarantee that:</p>
        <LegalList
          items={[
            'The website will be uninterrupted',
            'The website will always be available',
            'Website content will always be error-free',
            'Files downloaded from the website will be free from viruses or harmful components',
          ]}
        />
        <p>
          Users are responsible for implementing appropriate security measures when accessing online
          resources.
        </p>
      </LegalSection>

      <LegalSection number={15} heading="Indemnification">
        <p>
          You agree to indemnify and hold harmless CanCAF, its officers, directors, employees,
          volunteers, partners, and affiliates from claims, liabilities, damages, losses, and
          expenses arising from:
        </p>
        <LegalList
          items={[
            'Violation of these Terms',
            'Improper use of the website',
            'Violation of applicable laws',
            'Infringement of third-party rights',
          ]}
        />
      </LegalSection>

      <LegalSection number={16} heading="Termination">
        <p>
          CanCAF may suspend or terminate access to its website or services at any time if a user
          breaches these Terms or engages in conduct that may damage CanCAF, its operations,
          reputation, or stakeholders.
        </p>
      </LegalSection>

      <LegalSection number={17} heading="Changes to These Terms">
        <p>CanCAF may revise these Terms periodically.</p>
        <p>Updated versions will be posted on the website with a revised effective date.</p>
        <p>
          Continued use of the website after publication of changes constitutes acceptance of the
          revised Terms.
        </p>
      </LegalSection>

      <LegalSection number={18} heading="Governing Law">
        <p>
          These Terms shall be governed and interpreted in accordance with the laws applicable in
          the Republic of Ghana, without prejudice to applicable international obligations and
          regulatory requirements relevant to CanCAF&apos;s operations.
        </p>
      </LegalSection>

      <LegalSection number={19} heading="Contact Information">
        <LegalContact heading="For questions regarding these Terms, please contact:" />
      </LegalSection>
    </LegalPage>
  )
}
