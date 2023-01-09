json.array! @activities do |activity|
  json.id activity.id
  json.prompt activity.prompt
  json.style activity.style
  json.options activity.options
  json.updated_at activity.updated_at
end
