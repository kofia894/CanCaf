import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'CanCAF Settings',
      readOnly: true,
    }),
    defineField({
      name: 'cgcponApplicationsOpen',
      title: 'CGCP-ON Applications Open',
      type: 'boolean',
      description: 'Toggle to open or close CGCP-ON Africa programme applications. When disabled, the application form and page will be inaccessible.',
      initialValue: false,
    }),
    defineField({
      name: 'cgcponClosedMessage',
      title: 'Applications Closed Message',
      type: 'text',
      description: 'Message to display when applications are closed',
      initialValue: 'Applications for the CGCP-ON Africa programme are currently closed. Please check back later for future application periods.',
    }),
    defineField({
      name: 'cgcponRegistrationFee',
      title: 'CGCP-ON Registration Fee (GHS)',
      type: 'number',
      description: 'Registration fee amount in Ghana Cedis that applicants must pay before accessing the application form',
      initialValue: 50,
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'litRegistrationOpen',
      title: 'LIT Registration Open',
      type: 'boolean',
      description: 'Toggle to open or close registration for the LIT leadership series.',
      initialValue: true,
    }),
    defineField({
      name: 'litRegistrationFee',
      title: 'LIT Registration Fee',
      type: 'number',
      description: 'Amount participants pay to register for LIT, in the currency selected below. Set to 0 to make registration free (participants skip payment entirely).',
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'litRegistrationCurrency',
      title: 'LIT Registration Currency',
      type: 'string',
      description: 'Currency charged via Paystack. USD requires multi-currency to be enabled on the Paystack account.',
      options: {
        list: [
          {title: 'Ghana Cedis (GHS)', value: 'GHS'},
          {title: 'US Dollars (USD)', value: 'USD'},
          {title: 'Nigerian Naira (NGN)', value: 'NGN'},
          {title: 'South African Rand (ZAR)', value: 'ZAR'},
          {title: 'Kenyan Shilling (KES)', value: 'KES'},
        ],
      },
      initialValue: 'GHS',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
