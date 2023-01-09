json.activity do
  json.extract! @activity, :id, :prompt, :style, :options, :created_at, :updated_at
end
