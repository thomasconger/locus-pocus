module ApplicationCable
  class Connection < ActionCable::Connection::Base

    #Will I need an identifier?
    #identified_by :identifier

    def connect
      #dummy content, not necessarily correct
      puts "Connection established!"
    end
  end
end
