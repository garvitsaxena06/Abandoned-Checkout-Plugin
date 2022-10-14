import mongoose from 'mongoose'

const scheduledMessagesSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    sent: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const checkoutSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    scheduledMessages: [scheduledMessagesSchema],
    scheduleActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Checkout = mongoose.model('Checkout', checkoutSchema)

export default Checkout
