import {defineField, defineType} from 'sanity'

export const attendanceType = defineType({
  name: 'attendance',
  title: 'Programme Attendance',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Contact Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'registeredAt',
      title: 'Registered At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'organisation',
      email: 'email',
      date: 'registeredAt',
    },
    prepare({title, subtitle, email, date}) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : ''
      return {
        title: title || 'Unnamed Attendee',
        subtitle: `${subtitle || ''} | ${email || ''} | ${formattedDate}`,
      }
    },
  },
  orderings: [
    {
      title: 'Registration Date (Newest)',
      name: 'registeredAtDesc',
      by: [{field: 'registeredAt', direction: 'desc'}],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'fullName', direction: 'asc'}],
    },
  ],
})
