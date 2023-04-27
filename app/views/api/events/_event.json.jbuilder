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
  :ticket_quantity

if event.photo.attached?
  json.photo_url url_for(event.photo)
end
