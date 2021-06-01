import { Controller } from "stimulus"
import consumer from "../channels/consumer"
// import * as ActionCable from '@rails/actioncable'
// ActionCable.logger.enabled = true

export default class extends Controller {

  static targets = [ "output" ]

  connect() {
    
    if (this.controllerIndex == null) {
      if (window.controllerCount != null)
        window.controllerCount += 1
      else
        window.controllerCount = 1
        
      this.controllerIndex = window.controllerCount
    }
      
    this.outputTarget.textContent = 'Hello, Stimulus! ' + this.controllerIndex

    this.startDebug()

    this.reloadListener = (event) => { this.closeConnecion() }
    document.addEventListener("hello:reload", this.reloadListener, false)

    

    let cont = this;
    if (!this.testChannel || this.testChannel.consumer.connection.disconected) {
      this.testChannel = consumer.subscriptions.create( { channel: 'TestChannel' }, {
        initialized() {
          cont.log("TestChannel initialized")
        },

        connected() {
          // Called when the subscription is ready for use on the server
          cont.log("TestChannel connected")
          cont.resetDebug()
        },

        disconnected() {
          // Called when the subscription has been terminated by the server
          cont.log("TestChannel disconnected")
        },

        received(data) {
          cont.log("TestChannel received data: " + JSON.stringify(data))
          cont.resetDebug()
        }
      });
    }
    else {
      cont.log("Reusing connection")
    }

  }
  
  log(string) {
    this.outputTarget.innerHTML = this.outputTarget.innerHTML + "<br>" + string
    console.log(this.outputTarget.innerHTML + "<br>" + string, this.controllerIndex)
  }
  
  closeConnecion() {
    if (this.testChannel) {
      this.log("Unsubscribing IntakeChannel in disconnect")
      this.testChannel.unsubscribe()
      // this.testChannel.consumer.connection.close()
      this.testChannel = null
    }
  }

  disconnect() {
    this.log("disconnect()")
    this.closeConnecion()
    document.removeEventListener("hello:reload", this.reloadListener)
  }

  startDebug() {
    this.debugTimer = setTimeout(() => {
      let channelInfo = "testChannel is null"
      if (this.testChannel) {
        channelInfo = { identifier: this.testChannel.identifier }
        channelInfo['disconnected'] = this.testChannel.consumer.connection.disconnected

        let subscriptions = []
        this.testChannel.consumer.subscriptions.subscriptions.forEach((sub) => {
          subscriptions.push(sub.identifier)
        })
        channelInfo['subscriptions'] = subscriptions
      }
      this.log("Test loaded but websocket didn't trigger." + JSON.stringify({ channel_info: channelInfo }))
    }, 5000)
  }

  resetDebug() {
    if (this.debugTimer) {
      clearTimeout(this.debugTimer)
    }
  }
  
}
