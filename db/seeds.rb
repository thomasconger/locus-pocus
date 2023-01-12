ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition',
    email: 'demo@user.io',
    password: 'password',
    live_activity_id: 1
  )

  # More users
  10.times do
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    })
  end

  puts "Creating activities"

  Activity.create!({
    prompt: "this is the first seed data",
    style: "multiple-choice",
    options: "{\"option1\":\"option a\",\"option2\":\"option b\"}",
    user_id: 1
  })
  Activity.create!({
    prompt: "this is the second seed data",
    style: "multiple-choice",
    options: "{\"option1\":\"option a\",\"option2\":\"option b\"}",
    user_id: 1
  })
  Activity.create!({
    prompt: "this is the third seed data",
    style: "multiple-choice",
    options: "{\"option1\":\"option a\",\"option2\":\"option b\", \"option3\":\"option a\"}",
    user_id: 1
  })

  Activity.create!({
    prompt: "this is the four activity seed data -- you shouldn't see this",
    style: "multiple-choice",
    options: "{\"option1\":\"option a\",\"option2\":\"option b\", \"option3\":\"option a\"}",
    user_id: 2
  })

  puts "Done!"
end
