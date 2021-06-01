class NotifyThingJob < ApplicationJob
  
  def perform
    TestChannel.broadcast_to "test_channel", "You have been notified"
  end
  
end
