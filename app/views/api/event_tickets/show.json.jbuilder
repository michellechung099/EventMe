json.ticket do
  json.partial! 'api/event_tickets/event_ticket', ticket: @ticket
end
