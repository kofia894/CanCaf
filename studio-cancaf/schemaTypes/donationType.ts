import {defineType, defineField} from 'sanity'
import {CreditCardIcon} from '@sanity/icons'

export const donationType = defineType({
  name: 'donation',
  title: 'Donation',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'clientReference',
      title: 'Client Reference',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'checkoutId',
      title: 'Checkout ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'amount',
      title: 'Amount (GHS)',
      type: 'number',
      readOnly: true,
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'status',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Successful', value: 'successful'},
          {title: 'Failed', value: 'failed'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'donorFirstName',
      title: 'Donor First Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'donorLastName',
      title: 'Donor Last Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'donorEmail',
      title: 'Donor Email',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'donorPhone',
      title: 'Donor Phone',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Donor Message',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
      readOnly: true,
      description: 'Hubtel transaction ID after successful payment',
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      readOnly: true,
      description: 'e.g., Mobile Money, Card',
    }),
    defineField({
      name: 'paidAt',
      title: 'Payment Date',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'hubtelResponse',
      title: 'Hubtel Response Data',
      type: 'text',
      readOnly: true,
      description: 'Raw callback data from Hubtel for reference',
    }),
  ],
  preview: {
    select: {
      firstName: 'donorFirstName',
      lastName: 'donorLastName',
      amount: 'amount',
      status: 'status',
      date: 'paidAt',
    },
    prepare({firstName, lastName, amount, status, date}) {
      const name = [firstName, lastName].filter(Boolean).join(' ') || 'Anonymous'
      const statusEmoji = status === 'successful' ? '✅' : status === 'failed' ? '❌' : '⏳'
      return {
        title: `${statusEmoji} GHS ${amount || 0} - ${name}`,
        subtitle: date ? new Date(date).toLocaleDateString() : 'Pending',
      }
    },
  },
  orderings: [
    {
      title: 'Payment Date, New',
      name: 'paidAtDesc',
      by: [{field: 'paidAt', direction: 'desc'}],
    },
    {
      title: 'Amount, High to Low',
      name: 'amountDesc',
      by: [{field: 'amount', direction: 'desc'}],
    },
  ],
})
