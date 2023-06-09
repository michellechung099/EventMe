json.extract! event,
  :id,
  :title,
  :user_id,
  :event_type,
  :category,
  :location,
  :start_time,
  :end_time,
  :summary,
  :ticket_quantity,
  :description

if event.photo.attached?
  json.photo_url url_for(event.photo)
end

json.event_ticket_id event.event_tickets.last&.id
json.ticket_quantity event.event_tickets.sum(&:quantity)
