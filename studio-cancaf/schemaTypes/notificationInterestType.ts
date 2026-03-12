import {defineField, defineType} from 'sanity'

export const notificationInterestType = defineType({
  name: 'notificationInterest',
  title: 'Notification Interest',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'programme',
      title: 'Programme',
      type: 'string',
      description: 'Which programme they want to be notified about',
      initialValue: 'cgcpon-africa',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'notified',
      title: 'Notified',
      type: 'boolean',
      description: 'Has this person been notified when applications opened?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})
