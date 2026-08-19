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
  title: 'Privacy Policy',
  description:
    'How CanCAF collects, uses, discloses, stores, and protects personal data. Aligned with the Ghana Data Protection Act, 2012 (Act 843) and the GDPR where applicable. Version V01-2026.',
  openGraph: {
    title: 'Privacy Policy - CanCAF',
    description:
      'How CanCAF collects, uses, discloses, stores, and protects your personal data.',
  },
}

/**
 * CanCAF Privacy Policy
 *
 * Content transcribed from "CANCAF FOUNDATION (CanCAF) PRIVACY POLICY V01".
 * When the source document is revised, update the version and dates in the
 * LegalPage props along with the affected clauses.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      tag="Legal"
      title="Privacy Policy"
      subtitle="How we collect, use, store, and protect your personal information."
      version="V01-2026"
      effectiveDate="12 August 2026"
      nextReviewDate="11 August 2028"
      intro={
        <>
          <p>
            The{' '}
            <strong className="text-zinc-900">Cancer Care Africa Foundation (CanCAF)</strong>{' '}
            (&ldquo;CanCAF&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is
            committed to protecting your privacy and safeguarding your personal information. This
            Privacy Policy explains how we collect, use, disclose, store, and protect personal data
            when you visit our website, participate in our programs, make donations, register for
            events, subscribe to communications, apply for scholarships or training programs, or
            otherwise interact with us.
          </p>
          <p>
            CanCAF&apos;s mission is to strengthen cancer care systems across Africa through
            education, training, awareness, partnerships, and capacity-building initiatives.
          </p>
          <p>This Privacy Policy is designed to align with:</p>
          <LegalList
            items={[
              'The Ghana Data Protection Act, 2012 (Act 843)',
              'The General Data Protection Regulation (GDPR) where applicable',
              'Other applicable privacy and data protection laws',
            ]}
          />
        </>
      }
    >
      <LegalSection number={1} heading="Data Controller">
        <p>For purposes of applicable data protection laws, the data controller is:</p>
        <LegalContact heading="" />
      </LegalSection>

      <LegalSection number={2} heading="Information We Collect">
        <p>We may collect the following categories of personal data:</p>

        <LegalSubheading>A. Personal Identification Information</LegalSubheading>
        <LegalList
          items={[
            'Full name',
            'Gender',
            'Date of birth (where applicable)',
            'Country of residence',
            'Nationality',
            'Professional credentials',
            'Professional registration details',
            'Academic qualifications',
          ]}
        />

        <LegalSubheading>B. Contact Information</LegalSubheading>
        <LegalList
          items={[
            'Email address',
            'Telephone number',
            'Postal address',
            'Organization or institution',
          ]}
        />

        <LegalSubheading>C. Program Participation Information</LegalSubheading>
        <p>
          Where you participate in CanCAF programs, scholarships, fellowships, conferences, research
          projects, or training initiatives, we may collect:
        </p>
        <LegalList
          items={[
            'Application forms',
            'Curriculum vitae (CV)',
            'Professional certifications',
            'Educational records',
            'Program performance information',
            'Attendance records',
            'Training completion status',
          ]}
        />

        <LegalSubheading>D. Donation Information</LegalSubheading>
        <p>If you donate to CanCAF, we may collect:</p>
        <LegalList
          items={[
            'Donor name',
            'Contact information',
            'Donation history',
            'Payment confirmation details',
          ]}
        />
        <p className="font-semibold text-zinc-900">
          CanCAF does not store complete payment card details.
        </p>

        <LegalSubheading>E. Technical Information</LegalSubheading>
        <p>When you visit our website, we may collect:</p>
        <LegalList
          items={[
            'IP address',
            'Browser type',
            'Device information',
            'Operating system',
            'Access times',
            'Pages visited',
            'Referral website information',
          ]}
        />

        <LegalSubheading>F. Communications</LegalSubheading>
        <p>We may retain records of:</p>
        <LegalList
          items={[
            'Emails',
            'Contact forms',
            'Event registrations',
            'Enquiries',
            'Newsletter subscriptions',
          ]}
        />
      </LegalSection>

      <LegalSection number={3} heading="Special Category Data">
        <p>
          Some CanCAF activities may involve health-related projects, cancer awareness initiatives,
          research programs, or patient advocacy.
        </p>
        <p>
          In such circumstances, we may collect or process special category data only when:
        </p>
        <LegalList
          items={[
            'Explicit consent has been obtained;',
            'Processing is necessary for scientific or public health purposes;',
            'Processing is required by law; or',
            'Another lawful basis under applicable legislation applies.',
          ]}
        />
        <p>We implement enhanced safeguards for sensitive information.</p>
      </LegalSection>

      <LegalSection number={4} heading="How We Collect Information">
        <p>We collect information through:</p>
        <LegalList
          items={[
            'Website forms',
            'Event registrations',
            'Scholarship applications',
            'Fellowship applications',
            'Donation submissions',
            'Newsletter subscriptions',
            'Surveys and research activities',
            'Email correspondence',
            'Training programme enrolments',
            'Partnership engagements',
          ]}
        />
        <p>
          We may also receive information from authorized partner organizations involved in
          delivering CanCAF initiatives. CanCAF&apos;s activities include training programs,
          partnerships, educational initiatives, and capacity-building projects.
        </p>
      </LegalSection>

      <LegalSection number={5} heading="Legal Basis for Processing">
        <p>
          Where GDPR applies, we process personal data on one or more of the following legal bases:
        </p>

        <LegalSubheading>Consent</LegalSubheading>
        <p>
          For newsletters, research participation, photographs, testimonials, and certain program
          activities.
        </p>

        <LegalSubheading>Contractual Necessity</LegalSubheading>
        <p>
          To administer scholarships, fellowships, training programmes, events, partnerships, or
          volunteer engagements.
        </p>

        <LegalSubheading>Legal Obligation</LegalSubheading>
        <p>To comply with applicable laws and regulatory requirements.</p>

        <LegalSubheading>Legitimate Interests</LegalSubheading>
        <p>
          To improve our services, manage operations, communicate with stakeholders, promote our
          mission, and protect our organization.
        </p>

        <LegalSubheading>Public Interest</LegalSubheading>
        <p>
          For educational, public health, and research initiatives consistent with our charitable
          objectives.
        </p>
      </LegalSection>

      <LegalSection number={6} heading="How We Use Personal Data">
        <p>We may use personal information to:</p>
        <LegalList
          items={[
            'Administer training programmes and educational initiatives',
            'Process scholarship and fellowship applications',
            'Organize conferences and events',
            'Manage volunteers and partnerships',
            'Process donations',
            'Respond to enquiries',
            'Conduct research and impact assessments',
            'Publish reports and programme outcomes',
            'Improve website functionality',
            'Send newsletters and updates',
            'Meet legal and regulatory obligations',
          ]}
        />
        <p>
          CanCAF conducts capacity-building, educational, awareness, and partnership initiatives
          across Africa.
        </p>
      </LegalSection>

      <LegalSection number={7} heading="Marketing Communications">
        <p>Where permitted by law, we may send:</p>
        <LegalList
          items={[
            'Newsletters',
            'Programme announcements',
            'Event invitations',
            'Training opportunities',
            'Research updates',
            'Fundraising communications',
          ]}
        />
        <p>You may unsubscribe at any time by:</p>
        <LegalList
          items={['Using the unsubscribe link in our emails; or', 'Contacting us directly.']}
        />
      </LegalSection>

      <LegalSection number={8} heading="Cookies and Website Technologies">
        <p>Our website may use cookies and similar technologies to:</p>
        <LegalList
          items={[
            'Ensure website functionality',
            'Improve user experience',
            'Analyze website usage',
            'Enhance security',
            'Measure website performance',
          ]}
        />
        <p>Users may manage cookie preferences through their browser settings.</p>
        <p>A separate Cookie Policy may be provided where required.</p>
      </LegalSection>

      <LegalSection number={9} heading="Disclosure of Personal Information">
        <p className="font-semibold text-zinc-900">We do not sell personal information.</p>
        <p>We may disclose information to:</p>

        <LegalSubheading>Service Providers</LegalSubheading>
        <p>Organizations supporting:</p>
        <LegalList
          items={[
            'Website hosting',
            'Email communication',
            'Payment processing',
            'Learning management systems',
            'Data storage',
          ]}
        />

        <LegalSubheading>Program Partners</LegalSubheading>
        <p>Institutions collaborating with CanCAF on educational and healthcare initiatives.</p>

        <LegalSubheading>Professional Advisors</LegalSubheading>
        <p>Including auditors, legal advisors, and regulatory consultants.</p>

        <LegalSubheading>Regulators and Authorities</LegalSubheading>
        <p>Where disclosure is required by law.</p>

        <LegalSubheading>Research Institutions</LegalSubheading>
        <p>Where appropriate ethical approvals, participant consent, and legal safeguards exist.</p>
      </LegalSection>

      <LegalSection number={10} heading="International Data Transfers">
        <p>
          Because CanCAF supports programmes across Africa and may collaborate with international
          institutions, personal information may be transferred to countries outside Ghana. CanCAF
          operates capacity-building and partnership initiatives involving healthcare and
          educational stakeholders across Africa.
        </p>
        <p>When international transfers occur, we implement appropriate safeguards including:</p>
        <LegalList
          items={[
            'Standard Contractual Clauses (SCCs)',
            'Data Processing Agreements',
            'Adequacy mechanisms where applicable',
            'Technical and organizational security measures',
          ]}
        />
      </LegalSection>

      <LegalSection number={11} heading="Data Retention">
        <p>We retain personal information only as long as necessary to:</p>
        <LegalList
          items={[
            'Deliver programmes and services',
            'Fulfil legal obligations',
            'Resolve disputes',
            'Maintain historical and impact records',
            'Meet audit requirements',
          ]}
        />
        <p>
          Retention periods are determined according to legal, regulatory, contractual, and
          operational requirements.
        </p>
      </LegalSection>

      <LegalSection number={12} heading="Security of Information">
        <p>
          CanCAF implements reasonable administrative, technical, and organizational measures to
          protect personal information against:
        </p>
        <LegalList
          items={[
            'Unauthorized access',
            'Disclosure',
            'Alteration',
            'Loss',
            'Misuse',
            'Destruction',
          ]}
        />
        <p>Security measures may include:</p>
        <LegalList
          items={[
            'Access controls',
            'Encryption',
            'Secure storage systems',
            'Password protection',
            'Staff confidentiality obligations',
          ]}
        />
        <p>
          No electronic transmission or storage system can be guaranteed to be completely secure.
        </p>
      </LegalSection>

      <LegalSection number={13} heading="Your Data Protection Rights">
        <p>Subject to applicable law, you may have the right to:</p>
        <dl className="space-y-4">
          {[
            ['Access', 'Request a copy of your personal data.'],
            ['Rectification', 'Correct inaccurate or incomplete information.'],
            ['Erasure', 'Request deletion of personal information under applicable circumstances.'],
            ['Restriction', 'Request limitation of processing.'],
            ['Objection', 'Object to certain forms of processing.'],
            [
              'Data Portability',
              'Receive personal information in a structured and machine-readable format.',
            ],
            [
              'Withdraw Consent',
              'Withdraw consent at any time where processing relies on consent.',
            ],
          ].map(([term, description]) => (
            <div key={term}>
              <dt className="font-semibold text-zinc-900">{term}</dt>
              <dd className="text-zinc-700">{description}</dd>
            </div>
          ))}
        </dl>
      </LegalSection>

      <LegalSection number={14} heading="Children's Privacy">
        <p>CanCAF does not knowingly collect personal information from children unless:</p>
        <LegalList
          items={[
            'Appropriate parental or guardian consent has been obtained; and',
            'The collection is necessary for an approved programme or activity.',
          ]}
        />
        <p>
          Where information relating to minors is processed, additional safeguards will be
          implemented.
        </p>
      </LegalSection>

      <LegalSection number={15} heading="Photographs, Videos and Testimonials">
        <p>
          CanCAF may capture photographs, audio recordings, video recordings, testimonials, and
          interviews during:
        </p>
        <LegalList
          items={[
            'Conferences',
            'Training programmes',
            'Fellowships',
            'Scholarship events',
            'Workshops',
            'Public engagement activities',
          ]}
        />
        <p>Where required, consent will be obtained before publication or promotional use.</p>
        <p>Individuals may withdraw consent subject to practical and legal limitations.</p>
      </LegalSection>

      <LegalSection number={16} heading="Data Breach Management">
        <p>
          CanCAF maintains procedures for identifying, reporting, managing, and responding to
          personal data breaches.
        </p>
        <p>Where required by law:</p>
        <LegalList
          items={[
            'Relevant authorities will be notified.',
            'Affected individuals may be informed.',
            'Appropriate remediation measures will be implemented.',
          ]}
        />
      </LegalSection>

      <LegalSection number={17} heading="Third-Party Websites">
        <p>
          Our website may contain links to third-party websites including educational institutions,
          healthcare organizations, donors, partners, and collaborators.
        </p>
        <p>CanCAF is not responsible for:</p>
        <LegalList
          items={['Third-party privacy practices', 'Third-party policies', 'Third-party content']}
        />
        <p>
          Users should review the privacy policies of external websites before providing personal
          information.
        </p>
      </LegalSection>

      <LegalSection number={18} heading="Changes to This Privacy Policy">
        <p>CanCAF may update this Privacy Policy periodically.</p>
        <p>Updated versions will be posted on our website with a revised effective date.</p>
        <p>
          Continued use of the website after publication of changes constitutes acceptance of the
          updated Policy.
        </p>
      </LegalSection>

      <LegalSection number={19} heading="Complaints">
        <p>
          If you have concerns regarding our handling of personal information, please contact CanCAF
          first so we may attempt to resolve the matter.
        </p>
        <p>Where applicable, individuals may also lodge complaints with:</p>
        <div className="pl-4 border-l-2 border-zinc-200 space-y-3">
          <div>
            <p className="font-semibold text-zinc-900">Ghana Data Protection Commission</p>
            <p className="text-zinc-700">Republic of Ghana</p>
          </div>
          <p className="text-zinc-500">or</p>
          <div>
            <p className="font-semibold text-zinc-900">Relevant Supervisory Authority</p>
            <p className="text-zinc-700">Within the applicable jurisdiction under GDPR.</p>
          </div>
        </div>
      </LegalSection>

      <LegalSection number={20} heading="Contact Us">
        <LegalContact heading="For questions regarding this Privacy Policy or the processing of personal data, please contact:" />
        <p className="pt-2">
          See also our{' '}
          <Link href="/terms" className="text-[#0F766E] font-medium hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
