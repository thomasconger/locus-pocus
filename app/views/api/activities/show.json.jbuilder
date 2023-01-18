json.activity do
  json.extract! @activity, :id, :prompt, :style, :options, :user_id, :created_at, :updated_at
end
json.responses do
  json.array! @activity.responses do |res|
    json.extract! res, :id, :body, :activity_id, :created_at, :updated_at
  end
end
