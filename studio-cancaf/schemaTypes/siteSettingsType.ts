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
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
