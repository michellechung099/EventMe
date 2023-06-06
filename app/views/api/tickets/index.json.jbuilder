json.tickets({})

json.tickets do
  @tickets.each do |ticket|
    json.set! ticket.id do
      json.partial! 'api/tickets/ticket', ticket: ticket
      json.eventName ticket.event_ticket.event.title
    end
  end
end
