class Api::TicketsController < ApplicationController
  before_action :require_logged_in
  wrap_parameters include: Ticket.attribute_names

  def index
    # @event_tickets = EventTicket.where(user_id: current_user.id)
    @tickets = Ticket.where(buyer_id: current_user.id)
    render 'api/tickets/index'
  end

  def purchased_tickets
    @tickets = Ticket.where(buyer_id: current_user.id)
    render 'api/tickets/index'
  end

  def create_event_ticket
    @event = Event.find(params[:event_id])
    @ticket = EventTicket.find(params[:ticket_id])
    @ticket.buyer_id = current_user.id
    @event.ticket_quantity += params[:ticket][:quantity].to_i
    @event.save!

    if @ticket.save!
      @ticket.update(buyer_id: current_user.id)
      render :show
    else
      render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def create
    @ticket = Ticket.new(ticket_params)
    puts "@ticket: #{@ticket.inspect}"
    puts "ticket_params: #{ticket_params.inspect}"
    @event = Event.find(params[:event_id])
    @event.ticket_quantity -= params[:ticket][:quantity].to_i
    @event.save!

    if @ticket.save!
      @ticket.update(buyer_id: current_user.id)
      render :show
    else
      render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @ticket = Ticket.find(params[:id])
    render 'api/tickets/show'
  end

  def destroy
    @ticket = Ticket.find(params[:id])
    if (@ticket.buyer_id == current_user.id) && @ticket
      @ticket.destroy
      render json: { message: 'Ticket deleted successfully' }, status: 200
    else
      render json: { message: 'Ticket not found' }, status: 404
    end
  end

  def update
    @event = Event.find(params[:event_id])
    @ticket = EventTicket.find_by(event_id: params[:event_id])
    @ticket.buyer_id = current_user.id
    @ticket.event_id = params[:event_id]

    if @ticket.save!
      @event.ticket_quantity -= params[:ticket][:quantity].to_i
      @event.save!
      render :show
    else
      render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def reduce
    @event = Event.find(params[:event_id])
    @ticket = Ticket.find_by(event_id: params[:event_id])
    @ticket.buyer_id = current_user.id
    @ticket.event_id = params[:event_id]

    if @ticket.save!
      @event.ticket_quantity -= params[:ticket][:quantity].to_i
      @event.save!
      render :show
    else
      render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def ticket_params
    params.require(:ticket).permit(
      :quantity,
      :event_ticket_id,
    )
  end
end
