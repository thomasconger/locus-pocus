json.activity do
  json.extract! @activity, :id, :prompt, :style, :options, :user_id, :created_at, :updated_at
end
