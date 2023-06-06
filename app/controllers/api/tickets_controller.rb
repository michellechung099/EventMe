class Api::TicketsController < ApplicationController
  before_action :require_logged_in
  wrap_parameters include: Ticket.attribute_names

  def index
    @event_tickets = EventTicket.where(user_id: current_user.id)
    @tickets = Ticket.where(event_ticket_id:  @event_tickets.pluck(:id))
    render 'api/tickets/index'
  end

  def purchased_tickets
    @tickets = Ticket.where(buyer_id: current_user.id)
    render 'api/tickets/index'
  end

  def purchase_ticket
    @event = Event.find(params[:event_id])
    @ticket = Ticket.find(params[:ticket_id])
    @ticket.user_id = current_user.id
    @ticket.event_id = params[:event_id]
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
    @event = Event.find(params[:event_id])
    @ticket = Ticket.new(ticket_params)
    @ticket.user_id = current_user.id
    @ticket.event_id = params[:event_id]
    @event.ticket_quantity += params[:ticket][:quantity].to_i
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
    @ticket.destroy
  end

  def update
    @event = Event.find(params[:event_id])
    @ticket = Ticket.find_by(event_id: params[:event_id])
    @ticket.user_id = current_user.id
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
    @ticket.user_id = current_user.id
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
      :event_id,
      :name,
      :price,
      :quantity,
      :sales_start_time,
      :sales_end_time
      # might want to get rid of name for now
      # later, can put name back in to allow filtering & update tickets in accordance
      # as well as filter for purchase
      # for now, i can also just change one event to have one ticket name
    )
  end
end
