json.extract! ticket,
  :id,
  :quantity,
  :buyer_id

json.price ticket.event_ticket.price
json.user_id ticket.event_ticket.user_id
json.sales_start_time ticket.event_ticket.sales_start_time
json.sales_end_time ticket.event_ticket.sales_end_time
json.name ticket.event_ticket.name
json.event_id ticket.event_ticket.event_id
