ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Response.destroy_all
  Activity.destroy_all
  User.destroy_all


  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('activities')
  ApplicationRecord.connection.reset_pk_sequence!('responses')


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
    prompt: "Who is the better magician's assistant?",
    style: "multiple-choice",
    options: "{\"option1\":\"Cheshire Cat\",\"option2\":\"Mad Hatter\"}",
    user_id: 1
  })
  Activity.create!({
    prompt: "There's a beautiful garden through a tiny door. How do you get through?",
    style: "multiple-choice",
    options: "{\"option1\":\"Wait for the door to grow\",\"option2\":\"Change your perspective so the door gets bigger\",\"option3\":\"With great effort\",\"option4\":\"Drink the potion that says 'drink me'\"}",
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

  Response.create({
    body: "",
    activity_id: 1
  })
  Response.create({
    body: "",
    activity_id: 1
  })
  Response.create({
    body: "",
    activity_id: 1
  })
  Response.create({
    body: "",
    activity_id: 1
  })
  Response.create({
    body: "",
    activity_id: 1
  })



  puts "Done!"
end
