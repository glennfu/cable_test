// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

// import { createConsumer } from "@rails/actioncable"

import * as ActionCable from '@rails/actioncable'

ActionCable.logger.enabled = true
console.log("This!", ActionCable.Subscriptions)
console.log("That!", ActionCable.SubscriptionGuarantor)

export default ActionCable.createConsumer()
