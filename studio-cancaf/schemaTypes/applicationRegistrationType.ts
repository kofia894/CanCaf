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
      title: 'Payment Method (from Hubtel)',
      type: 'string',
      readOnly: true,
      description: 'The actual payment method used, returned by Hubtel after payment',
    }),
    defineField({
      name: 'selectedPaymentMethod',
      title: 'Selected Payment Method',
      type: 'string',
      options: {
        list: [
          {title: 'Mobile Money', value: 'Mobile Money'},
          {title: 'Bank Card', value: 'Bank Card'},
        ],
      },
      readOnly: true,
      description: 'The payment method selected by the user before payment',
    }),
    defineField({
      name: 'paidAt',
      title: 'Payment Date',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'hubtelResponse',
      title: 'Hubtel Callback Data',
      type: 'text',
      readOnly: true,
      description: 'Raw callback webhook data from Hubtel',
    }),
    defineField({
      name: 'hubtelStatusCheckResponse',
      title: 'Hubtel Status Check Data',
      type: 'text',
      readOnly: true,
      description: 'Raw transaction status check response from Hubtel',
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
