import {defineField, defineType} from 'sanity'

export const applicationType = defineType({
  name: 'application',
  title: 'CGCP-ON Africa Applications',
  type: 'document',
  groups: [
    {name: 'personal', title: 'A. Personal Information'},
    {name: 'professional', title: 'B. Professional Background'},
    {name: 'motivation', title: 'C. Motivation & Interest'},
    {name: 'institutional', title: 'D. Institutional Support'},
    {name: 'availability', title: 'E. Availability'},
    {name: 'documents', title: 'F. Supporting Documents'},
    {name: 'declaration', title: 'G. Declaration'},
  ],
  fields: [
    // Section A: Personal Information
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gender',
      title: 'Gender',
      type: 'string',
      group: 'personal',
      options: {
        list: [
          {title: 'Male', value: 'male'},
          {title: 'Female', value: 'female'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'date',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'countryOfResidence',
      title: 'Country of Residence',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'currentInstitution',
      title: 'Current Institution/Hospital/Clinic',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'currentPosition',
      title: 'Current Position/Title',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'yearsOncologyExperience',
      title: 'Years of Oncology Nursing Experience',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'professionalRegistrationNumber',
      title: 'Professional Registration/License Number',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number (WhatsApp)',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),

    // Section B: Professional Background
    defineField({
      name: 'nursingQualification',
      title: 'Highest Nursing Qualification',
      type: 'string',
      group: 'professional',
      options: {
        list: [
          {title: 'Diploma', value: 'diploma'},
          {title: 'Bachelor\'s Degree', value: 'bachelors'},
          {title: 'Master\'s Degree', value: 'masters'},
          {title: 'Doctorate', value: 'doctorate'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nursingQualificationOther',
      title: 'Other Qualification (if selected)',
      type: 'string',
      group: 'professional',
      hidden: ({document}) => document?.nursingQualification !== 'other',
    }),
    defineField({
      name: 'qualificationInstitution',
      title: 'Qualification Institution',
      type: 'string',
      group: 'professional',
    }),
    defineField({
      name: 'yearCompleted',
      title: 'Year Completed',
      type: 'string',
      group: 'professional',
    }),
    defineField({
      name: 'oncologyTraining',
      title: 'Oncology Specific Training/Certifications',
      type: 'text',
      group: 'professional',
    }),
    defineField({
      name: 'areasOfPractice',
      title: 'Current Area(s) of Practice',
      type: 'array',
      group: 'professional',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Medical Oncology', value: 'medicalOncology'},
          {title: 'Radiation Oncology', value: 'radiationOncology'},
          {title: 'Surgical Oncology', value: 'surgicalOncology'},
          {title: 'Pediatric Oncology', value: 'pediatricOncology'},
          {title: 'Palliative Care', value: 'palliativeCare'},
          {title: 'Hematology', value: 'hematology'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'areaOfPracticeOther',
      title: 'Other Area of Practice (if selected)',
      type: 'string',
      group: 'professional',
    }),
    defineField({
      name: 'priorGeneticsTraining',
      title: 'Prior Genetics/Genomics Training',
      type: 'boolean',
      group: 'professional',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'geneticsTrainingDetails',
      title: 'Genetics Training Details (if yes)',
      type: 'string',
      group: 'professional',
      hidden: ({document}) => document?.priorGeneticsTraining !== true,
    }),

    // Section C: Motivation and Interest
    defineField({
      name: 'interestReason',
      title: 'Why are you interested in this programme?',
      type: 'text',
      group: 'motivation',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'benefitDescription',
      title: 'How will this programme benefit your practice and patients?',
      type: 'text',
      group: 'motivation',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'counselingExperience',
      title: 'Experience with patient counseling about hereditary cancer',
      type: 'text',
      group: 'motivation',
      validation: (rule) => rule.required(),
    }),

    // Section D: Institutional Support
    defineField({
      name: 'institutionName',
      title: 'Institution Name',
      type: 'string',
      group: 'institutional',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'supervisorName',
      title: 'Supervisor/Line Manager Name',
      type: 'string',
      group: 'institutional',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'supervisorPosition',
      title: 'Supervisor Position/Title',
      type: 'string',
      group: 'institutional',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'supervisorContact',
      title: 'Supervisor Contact (Email/Phone)',
      type: 'string',
      group: 'institutional',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'supportLetter',
      title: 'Institutional Support Letter',
      type: 'file',
      group: 'institutional',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),

    // Section E: Availability
    defineField({
      name: 'canParticipateVirtually',
      title: 'Can participate in virtual training sessions',
      type: 'boolean',
      group: 'availability',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hasReliableInternet',
      title: 'Has reliable internet access',
      type: 'boolean',
      group: 'availability',
      validation: (rule) => rule.required(),
    }),

    // Section F: Supporting Documents
    defineField({
      name: 'cvFile',
      title: 'Curriculum Vitae (CV)',
      type: 'file',
      group: 'documents',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'statementOfInterestFile',
      title: 'Statement of Interest',
      type: 'file',
      group: 'documents',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'professionalLicenseFile',
      title: 'Professional License/Registration',
      type: 'file',
      group: 'documents',
      options: {
        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      },
    }),
    defineField({
      name: 'institutionalSupportLetterFile',
      title: 'Institutional Support Letter',
      type: 'file',
      group: 'documents',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),

    // Section G: Declaration
    defineField({
      name: 'declarationAgreed',
      title: 'Declaration Agreed',
      type: 'boolean',
      group: 'declaration',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'applicantSignatureName',
      title: 'Applicant Signature (Typed Name)',
      type: 'string',
      group: 'declaration',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'signatureDate',
      title: 'Signature Date',
      type: 'date',
      group: 'declaration',
      validation: (rule) => rule.required(),
    }),

    // Metadata
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Submitted (Unpaid)', value: 'submitted_unpaid'},
          {title: 'Submitted (Paid)', value: 'submitted_paid'},
          {title: 'Pending Review', value: 'pending'},
          {title: 'Under Review', value: 'reviewing'},
          {title: 'Accepted', value: 'accepted'},
          {title: 'Rejected', value: 'rejected'},
          {title: 'Waitlisted', value: 'waitlisted'},
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'currentStep',
      title: 'Current Form Step',
      type: 'number',
      description: 'Last step the applicant was on (for resuming)',
      initialValue: 1,
    }),
    defineField({
      name: 'lastSavedAt',
      title: 'Last Saved At',
      type: 'datetime',
      readOnly: true,
    }),

    // Payment tracking
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          {title: 'Unpaid', value: 'unpaid'},
          {title: 'Pending', value: 'pending'},
          {title: 'Paid', value: 'paid'},
          {title: 'Failed', value: 'failed'},
        ],
        layout: 'radio',
      },
      initialValue: 'unpaid',
    }),
    defineField({
      name: 'paymentClientReference',
      title: 'Payment Client Reference',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'paymentCheckoutId',
      title: 'Payment Checkout ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'paymentAmount',
      title: 'Payment Amount (GHS)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'paymentTransactionId',
      title: 'Payment Transaction ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'paidAt',
      title: 'Payment Date',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      status: 'status',
      paymentStatus: 'paymentStatus',
      date: 'submittedAt',
    },
    prepare({title, subtitle, status, paymentStatus, date}) {
      const statusLabels: Record<string, string> = {
        draft: '📝 Draft',
        submitted_unpaid: '⏳ Submitted (Unpaid)',
        submitted_paid: '💳 Submitted (Paid)',
        pending: '🟡 Pending Review',
        reviewing: '🔵 Reviewing',
        accepted: '🟢 Accepted',
        rejected: '🔴 Rejected',
        waitlisted: '🟠 Waitlisted',
      }
      const paymentLabels: Record<string, string> = {
        unpaid: '💵 Unpaid',
        pending: '⏳ Payment Pending',
        paid: '✅ Paid',
        failed: '❌ Payment Failed',
      }
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Not submitted'
      return {
        title: title || 'Unnamed Application',
        subtitle: `${statusLabels[status] || status} | ${paymentLabels[paymentStatus] || 'Unpaid'} | ${subtitle} | ${formattedDate}`,
      }
    },
  },
  orderings: [
    {
      title: 'Submission Date (Newest)',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Submission Date (Oldest)',
      name: 'submittedAtAsc',
      by: [{field: 'submittedAt', direction: 'asc'}],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{field: 'status', direction: 'asc'}],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'fullName', direction: 'asc'}],
    },
  ],
})
