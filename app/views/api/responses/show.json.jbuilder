json.array! @responses do |res|
  json.extract! res, :id, :body, :activity_id, :created_at, :updated_at
end
