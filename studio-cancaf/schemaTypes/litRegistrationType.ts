import {defineField, defineType} from 'sanity'

/**
 * LIT — Leadership Development Series for Nurses & Midwives
 * Participant registration submissions.
 *
 * Field order mirrors the registration form in
 * app/components/LITRegistrationForm.tsx.
 */
export const litRegistrationType = defineType({
  name: 'litRegistration',
  title: 'LIT Registration',
  type: 'document',
  groups: [
    {name: 'personal', title: 'Personal', default: true},
    {name: 'professional', title: 'Professional'},
    {name: 'leadership', title: 'Leadership'},
    {name: 'meta', title: 'Submission'},
  ],
  fields: [
    // 1
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    // 2
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required().email(),
    }),
    // 3
    defineField({
      name: 'ageRange',
      title: 'Age Range',
      type: 'string',
      group: 'personal',
      // Values are the display strings, matching the registration form and the
      // other option lists in this schema. Keep the two in sync.
      options: {
        list: [
          {title: 'Under 25', value: 'Under 25'},
          {title: '25 - 34', value: '25 - 34'},
          {title: '35 - 44', value: '35 - 44'},
          {title: '45 - 54', value: '45 - 54'},
          {title: '55 and above', value: '55 and above'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    // 4
    defineField({
      name: 'phone',
      title: 'WhatsApp / Phone Number',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    // 5
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    // 6
    defineField({
      name: 'profession',
      title: 'Profession',
      type: 'string',
      group: 'professional',
      options: {
        list: [
          {title: 'Nurse', value: 'Nurse'},
          {title: 'Midwife', value: 'Midwife'},
          {title: 'Other', value: 'Other'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'professionOther',
      title: 'Profession (if Other)',
      type: 'string',
      group: 'professional',
      hidden: ({parent}) => parent?.profession !== 'Other',
    }),
    // 7
    defineField({
      name: 'currentRole',
      title: 'Current Position / Role',
      type: 'string',
      group: 'professional',
      validation: (rule) => rule.required(),
    }),
    // 8
    defineField({
      name: 'institution',
      title: 'Institution / Organization',
      type: 'string',
      group: 'professional',
      validation: (rule) => rule.required(),
    }),
    // 9
    defineField({
      name: 'highestQualification',
      title: 'Highest Qualification Obtained',
      type: 'string',
      group: 'professional',
      validation: (rule) => rule.required(),
    }),
    // 10
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Professional Experience',
      type: 'string',
      group: 'professional',
      validation: (rule) => rule.required(),
    }),
    // 11
    defineField({
      name: 'inLeadershipRole',
      title: 'Currently in a leadership role?',
      type: 'string',
      group: 'leadership',
      options: {
        list: [
          {title: 'Yes', value: 'Yes'},
          {title: 'No', value: 'No'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    // 12
    defineField({
      name: 'previousLeadershipTraining',
      title: 'Previous leadership training?',
      type: 'string',
      group: 'leadership',
      options: {
        list: [
          {title: 'Yes', value: 'Yes'},
          {title: 'No', value: 'No'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    // 13
    defineField({
      name: 'reasonForJoining',
      title: 'Main reason for joining LIT',
      type: 'text',
      rows: 4,
      group: 'leadership',
      validation: (rule) => rule.required(),
    }),
    // 14
    defineField({
      name: 'leadershipArea',
      title: 'Leadership area to develop',
      type: 'string',
      group: 'leadership',
      options: {
        list: [
          {title: 'Self-leadership', value: 'Self-leadership'},
          {title: 'Communication & influence', value: 'Communication & influence'},
          {title: 'Team leadership', value: 'Team leadership'},
          {title: 'Change & quality improvement', value: 'Change & quality improvement'},
          {title: 'Strategic leadership', value: 'Strategic leadership'},
          {title: 'Other', value: 'Other'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'leadershipAreaOther',
      title: 'Leadership area (if Other)',
      type: 'string',
      group: 'leadership',
      hidden: ({parent}) => parent?.leadershipArea !== 'Other',
    }),
    // 15
    defineField({
      name: 'biggestChallenge',
      title: 'Biggest current leadership challenge',
      type: 'text',
      rows: 4,
      group: 'leadership',
      validation: (rule) => rule.required(),
    }),
    // 16
    defineField({
      name: 'hopeToGain',
      title: 'What they hope to gain from the programme',
      type: 'text',
      rows: 4,
      group: 'leadership',
      validation: (rule) => rule.required(),
    }),
    // 17
    defineField({
      name: 'canAttendAllSessions',
      title: 'Can attend all three sessions?',
      type: 'string',
      group: 'leadership',
      options: {
        list: [
          {title: 'Yes', value: 'Yes'},
          {title: 'No', value: 'No'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    // 18
    defineField({
      name: 'certificateName',
      title: 'Name as it should appear on certificate',
      type: 'string',
      group: 'personal',
      validation: (rule) => rule.required(),
    }),
    // 19
    defineField({
      name: 'consent',
      title: 'Consented to participate and receive programme communications',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      readOnly: true,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),

    // ---- Payment (Paystack) ----
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          {title: 'Not required (free)', value: 'not_required'},
          {title: 'Pending', value: 'pending'},
          {title: 'Paid', value: 'paid'},
          {title: 'Failed', value: 'failed'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'paymentReference',
      title: 'Payment Reference',
      type: 'string',
      group: 'meta',
      readOnly: true,
      description: 'Paystack transaction reference for this registration',
    }),
    defineField({
      name: 'amountPaid',
      title: 'Amount Paid',
      type: 'number',
      group: 'meta',
      readOnly: true,
    }),
    defineField({
      name: 'displayAmountUsd',
      title: 'Price Quoted (USD)',
      type: 'number',
      group: 'meta',
      readOnly: true,
      description: 'The dollar figure this participant was shown at registration',
    }),
    defineField({
      name: 'usdToGhsRateUsed',
      title: 'USD to GHS Rate Used',
      type: 'number',
      group: 'meta',
      readOnly: true,
      description: 'The rate in force when this registration was charged, kept for reconciling disputes',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      group: 'meta',
      readOnly: true,
    }),
    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
      group: 'meta',
      readOnly: true,
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      group: 'meta',
      readOnly: true,
      description: 'e.g. card, mobile_money, bank_transfer',
    }),
    defineField({
      name: 'paidAt',
      title: 'Payment Date',
      type: 'datetime',
      group: 'meta',
      readOnly: true,
    }),
    defineField({
      name: 'paystackResponse',
      title: 'Paystack Verification Data',
      type: 'text',
      group: 'meta',
      readOnly: true,
      description: 'Raw verification response from Paystack',
    }),
    defineField({
      name: 'confirmationEmailSent',
      title: 'Confirmation Email Sent',
      type: 'boolean',
      group: 'meta',
      readOnly: true,
      initialValue: false,
      description: 'Guards against sending duplicate confirmations when both the webhook and the return page fire',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      country: 'country',
      paymentStatus: 'paymentStatus',
    },
    prepare({title, subtitle, country, paymentStatus}) {
      const marker =
        paymentStatus === 'paid' ? '✅' : paymentStatus === 'failed' ? '❌' : paymentStatus === 'pending' ? '⏳' : ''
      return {
        title: [marker, title].filter(Boolean).join(' '),
        subtitle: country ? `${subtitle} · ${country}` : subtitle,
      }
    },
  },
})
