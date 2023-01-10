json.response do
  json.extract! @response, :id, :body, :activity_id, :created_at, :updated_at
end
