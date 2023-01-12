json.array! @activities do |activity|
  json.id activity.id
  json.prompt activity.prompt
  json.style activity.style
  json.user_id activity.user_id
  json.options activity.options
  json.updated_at activity.updated_at
end
