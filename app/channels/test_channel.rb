class TestChannel < ApplicationCable::Channel

  def subscribed
    Rails.logger.debug "ActionCable subscribed"
    stream_from "test:test_channel"
    
    NotifyThingJob.perform_later
  end

  def unsubscribed
    Rails.logger.debug "ActionCable unsubscribe"
    user_has_left
  end

  def unsubscribe_from_channel
    Rails.logger.debug "ActionCable unsubscribe_from_channel"
    user_has_left
  end

  private

    def user_has_left

    end

end
