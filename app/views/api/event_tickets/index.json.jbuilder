json.tickets({})

json.tickets do
  @tickets.each do |ticket|
    json.set! ticket.id do
      json.partial! 'api/event_tickets/event_ticket', ticket: ticket
    end
  end
end
