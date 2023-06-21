# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Event.destroy_all
  User.destroy_all
  EventTicket.destroy_all
  Ticket.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('events')
  ApplicationRecord.connection.reset_pk_sequence!('event_tickets')
  ApplicationRecord.connection.reset_pk_sequence!('tickets')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    email: 'demo@user.io',
    first_name: 'demo',
    last_name: 'user',
    password: 'password'
  )

  # More users
  10.times do
    User.create!({
      email: Faker::Internet.unique.email,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      password: 'password'
    })
  end

  puts "Done!"
end

event1 = Event.create!({
  title: 'Guided Boat Tour on River Senne',
  user_id: 1,
  event_type: 'Tour',
  category: 'Auto,Boat & Air',
  location: 'Brussels',
  start_time: '2023-06-05T04:00:00',
  end_time: '2023-06-05T06:59:59',
  recurring: false,
  summary: 'A guided boat tour along the River Senne with explanation of the river history',
  ticket_quantity: 10,
  description: Faker::Lorem.paragraph(sentence_count: 5)
})
photo1 = URI.open('https://eventme-seeds.s3.us-west-1.amazonaws.com/alessandro-cavestro-20HsmYeymbI-unsplash.jpg');
event1.photo.attach(io: photo1, filename:'alessandro-cavestro-20HsmYeymbI-unsplash.jpg');

event2= Event.create!({
  title: 'Peggy Gou 2023',
  user_id: 1,
  event_type: 'Concert or Performance',
  category: 'Music',
  location: '99 Grove St, San Francisco, CA 94102',
  start_time: '2023-07-20T14:30:00',
  end_time: '2023-07-20T17:30:00',
  recurring: false,
  summary: 'Peggy Gou is a South Korean DJ and record producer based in Germany',
  ticket_quantity: 50,
  description: Faker::Lorem.paragraph(sentence_count: 5)
})
photo2 = URI.open('https://eventme-seeds.s3.us-west-1.amazonaws.com/andre-benz-Yb-n0JHlsWY-unsplash.jpg');
event2.photo.attach(io: photo2, filename:'andre-benz-Yb-n0JHlsWY-unsplash.jpg');

event3 = Event.create!({
  title: 'Software Engineers Networking Event',
  user_id: 1,
  event_type: 'Meeting or Networking Event',
  category: 'Business and Professional',
  location: 'San Francisco',
  start_time: '2023-05-20T15:00:00',
  end_time: '2023-05-20T18:00:00',
  recurring: false,
  summary: 'a networking event for individuals in the software engineering industry',
  ticket_quantity: 15,
  description: Faker::Lorem.paragraph(sentence_count: 5)
})
photo3 = URI.open('https://eventme-seeds.s3.us-west-1.amazonaws.com/antenna-ZDN-G1xBWHY-unsplash.jpg')
event3.photo.attach(io: photo3, filename:'antenna-ZDN-G1xBWHY-unsplash.jpg')

event4 = Event.create!({
  title: 'Comedy Night',
  user_id: 1,
  event_type: 'Concert or Performance',
  category: 'Film, Media & Entertainment',
  location: 'San Francisco',
  start_time: '2023-06-20T16:00:00',
  end_time: '2023-06-20T19:00:00',
  recurring: false,
  summary: 'a 70+ minute show with 4-5 comics on the bill with credits like SF Sketchfest, Comedy Central, Viceland and more.',
  ticket_quantity: 15,
  description: Faker::Lorem.paragraph(sentence_count: 5)
})
photo4 = URI.open('https://eventme-seeds.s3.us-west-1.amazonaws.com/call-me-fred-969TUssR2S4-unsplash.jpg')
event4.photo.attach(io: photo4, filename:'call-me-fred-969TUssR2S4-unsplash.jpg')

event5 = Event.create!({
  title: 'Pottery Class',
  user_id: 1,
  event_type: 'Class, Training, or Workshop',
  category: 'Hobbies & Special Interest',
  location: 'San Francisco',
  start_time: '2023-04-28T13:30:00',
  end_time: '2023-04-28T16:30:00',
  recurring: false,
  summary: 'pottery making class led by a local artist',
  ticket_quantity: 20,
  description: Faker::Lorem.paragraph(sentence_count: 5)
})
photo5 = URI.open('https://eventme-seeds.s3.us-west-1.amazonaws.com/earl-wilcox-pSo0u53FF10-unsplash.jpg')
event5.photo.attach(io: photo5, filename:'earl-wilcox-pSo0u53FF10-unsplash.jpg')

event6 = Event.create!({
  title: 'Hike at the Yosemite National Park',
  user_id: 5,
  event_type: 'Attraction',
  category: 'Travel & Outdoor',
  location: 'California',
  start_time: '2023-05-28T12:00:00',
  end_time: '2023-05-28T15:00:00',
  recurring: false,
  summary: 'guided hike at the Yosemite National Park',
  ticket_quantity: 10,
  description: Faker::Lorem.paragraph(sentence_count: 5)
})
photo6 = URI.open('https://eventme-seeds.s3.us-west-1.amazonaws.com/fernando-hernandez-Kb_Zle8vI7c-unsplash.jpg')
event6.photo.attach(io: photo6, filename:'fernando-hernandez-Kb_Zle8vI7c-unsplash.jpg')

event7 = Event.create!({
  title: 'Embarcadero Run',
  user_id: 7,
  event_type: 'Race or Endurance Event',
  category: 'Sports & Fitness',
  location: 'The Embarcadero, San Francisco, California',
  start_time: '2023-06-28T17:00:00',
  end_time: '2023-06-28T20:00:00',
  recurring: false,
  summary: 'a casual running meetup at the embarcadero road',
  ticket_quantity: 8,
  description: Faker::Lorem.paragraph(sentence_count: 5)
})
photo7 = URI.open('https://eventme-seeds.s3.us-west-1.amazonaws.com/fitsum-admasu-oGv9xIl7DkY-unsplash.jpg')
event7.photo.attach(io: photo7, filename:'fitsum-admasu-oGv9xIl7DkY-unsplash.jpg')

event8 = Event.create!({
  title: 'Wine & Dine',
  user_id: 5,
  event_type: 'Party or Social Gathering',
  category: 'Food & Drink',
  location: '1168 Folsom St, San Francisco, CA 94103',
  start_time: '2023-05-03T14:00:00',
  end_time: '2023-05-03T17:00:00',
  recurring: false,
  summary: 'wine tasting with charcuterie as accompaniments',
  ticket_quantity: 10,
  description: Faker::Lorem.paragraph(sentence_count: 5)
})
photo8 = URI.open('https://eventme-seeds.s3.us-west-1.amazonaws.com/frank-rolando-romero-ZHoOhrH-yVs-unsplash.jpg')
event8.photo.attach(io: photo8, filename:'frank-rolando-romero-ZHoOhrH-yVs-unsplash.jpg')

event_ticket1 = EventTicket.create!({
  event_id: event1.id,
  name: "General Admission",
  unit_price: 0.00,
  quantity: 100,
  sales_start_time: '2023-05-15T04:00:00',
  sales_end_time: '2023-06-05T04:00:00',
  user_id: 1
})

event_ticket2 = EventTicket.create!({
  event_id: event1.id,
  name: "VIP",
  unit_price: 10.00,
  quantity: 50,
  sales_start_time: '2023-05-15T04:00:00',
  sales_end_time: '2023-06-05T04:00:00',
  user_id: 1
})

event_ticket3 = EventTicket.create!({
  event_id: event2.id,
  name: "General Admission",
  unit_price: 0.00,
  quantity: 50,
  sales_start_time: '2023-06-07T14:30:00',
  sales_end_time: '2023-07-20T14:30:00',
  user_id: 1
})

event_ticket4 = EventTicket.create!({
  event_id: event2.id,
  name: "VIP",
  unit_price: 10.00,
  quantity: 50,
  sales_start_time: '2023-06-07T14:30:00',
  sales_end_time: '2023-07-20T14:30:00',
  user_id: 1
})

event_ticket5 = EventTicket.create!({
  event_id: 3,
  name: "General Admission",
  unit_price: 10.00,
  quantity: 15,
  sales_start_time: '2023-05-01T15:00:00',
  sales_end_time: '2023-05-20T15:00:00',
  user_id: 1
})

event_ticket6 = EventTicket.create!({
  event_id: 4,
  name: "General Admission",
  unit_price: 10.00,
  quantity: 15,
  sales_start_time: '2023-06-01T16:00:00',
  sales_end_time: '2023-06-20T16:00:00',
  user_id: 1
})

event_ticket7 = EventTicket.create!({
  event_id: 5,
  name: "General Admission",
  unit_price: 10.00,
  quantity: 20,
  sales_start_time: '2023-04-01T13:30:00',
  sales_end_time: '2023-04-28T13:30:00',
  user_id: 1
})

event_ticket8 = EventTicket.create!({
  event_id: 6,
  name: "General Admission",
  unit_price: 10.00,
  quantity: 10,
  sales_start_time: '2023-05-01T12:00:00',
  sales_end_time: '2023-05-28T12:00:00',
  user_id: 5
})

event_ticket9 = EventTicket.create!({
  event_id: 7,
  name: "General Admission",
  unit_price: 10.00,
  quantity: 8,
  sales_start_time: '2023-06-01T17:00:00',
  sales_end_time: '2023-06-28T17:00:00',
  user_id: 7
})

event_ticket10 = EventTicket.create!({
  event_id: 8,
  name: "General Admission",
  unit_price: 10.00,
  quantity: 10,
  sales_start_time: '2023-04-15T14:00:00',
  sales_end_time: '2023-05-03T14:00:00',
  user_id: 5
})

ticket1 = Ticket.create!({
  quantity: 1,
  buyer_id: 1,
  event_ticket_id: 6
})

ticket2 = Ticket.create!({
  quantity: 1,
  buyer_id: 1,
  event_ticket_id: 7
})
