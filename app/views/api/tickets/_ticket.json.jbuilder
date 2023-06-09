json.extract! ticket,
  :id,
  :quantity,
  :buyer_id

json.price ticket.event_ticket.unit_price
json.user_id ticket.event_ticket.user_id
json.sales_start_time ticket.event_ticket.sales_start_time
json.sales_end_time ticket.event_ticket.sales_end_time
json.name ticket.event_ticket.name
json.event_id ticket.event_ticket.event_id

json.event do
  json.partial! '/api/events/event', event: ticket.event_ticket.event
end
