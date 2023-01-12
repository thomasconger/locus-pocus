class UserChannel < ApplicationCable::Channel

  # info is available in params
  # broadcasts can be sent from anywhere, such as in controllers
      # the example that comes to mind would be broadcasting a message after it was created
  #

  def subscribed
    # stream_from (dynamic) or stream_for (static)
    # this method is called when a user subscribes to the channel
    
    stream_for User.find_by(id: params[:id])
  end
end
