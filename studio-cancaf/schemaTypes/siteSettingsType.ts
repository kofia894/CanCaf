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
      title: 'CGCPON Applications Open',
      type: 'boolean',
      description: 'Toggle to open or close CGCPON Africa programme applications. When disabled, the application form and page will be inaccessible.',
      initialValue: false,
    }),
    defineField({
      name: 'cgcponClosedMessage',
      title: 'Applications Closed Message',
      type: 'text',
      description: 'Message to display when applications are closed',
      initialValue: 'Applications for the CGCPON Africa programme are currently closed. Please check back later for future application periods.',
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
