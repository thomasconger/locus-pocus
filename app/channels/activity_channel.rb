class ActivityChannel < ApplicationCable::Channel

  #info is available in params

  def subscribed
    # stream_from "fun_stream_name"
    puts 'subscribed'
    stream_for Activity.find_by(id: params[:id])
  end
end
