import {defineType, defineField} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const applicationRegistrationType = defineType({
  name: 'applicationRegistration',
  title: 'Application Registrations',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Paid', value: 'paid'},
          {title: 'Failed', value: 'failed'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'clientReference',
      title: 'Payment Reference',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'checkoutId',
      title: 'Checkout ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'amount',
      title: 'Amount Paid (GHS)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
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
    defineField({
      name: 'hubtelResponse',
      title: 'Hubtel Response',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'application',
      title: 'Linked Application',
      type: 'reference',
      to: [{type: 'application'}],
      description: 'The application submitted after registration',
    }),
    defineField({
      name: 'createdAt',
      title: 'Registration Date',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      email: 'email',
      phone: 'phone',
      status: 'paymentStatus',
      paidAt: 'paidAt',
    },
    prepare({email, phone, status, paidAt}) {
      const statusEmoji = status === 'paid' ? '✅' : status === 'failed' ? '❌' : '⏳'
      const date = paidAt ? new Date(paidAt).toLocaleDateString() : 'Not paid'
      return {
        title: `${statusEmoji} ${email}`,
        subtitle: `${phone} | ${date}`,
      }
    },
  },
  orderings: [
    {
      title: 'Registration Date (Newest)',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
    {
      title: 'Payment Status',
      name: 'statusAsc',
      by: [{field: 'paymentStatus', direction: 'asc'}],
    },
  ],
})
