class ActivityChannel < ApplicationCable::Channel

  #info is available in params

  def subscribed
    # stream_from "fun_stream_name"
    stream_for Activity.find_by(id: params[:id])
  end
end
