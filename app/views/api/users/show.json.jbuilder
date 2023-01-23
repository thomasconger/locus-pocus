json.user do
  json.extract! @user, :id, :email, :username, :live_activity_id, :created_at, :updated_at
end


if @user.live_activity_id then
  json.activity do
    json.extract! Activity.find(@user.live_activity_id), :id, :prompt, :style, :options, :created_at, :updated_at
  end
end
