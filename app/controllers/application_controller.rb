class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection

  rescue_from StandardError, with: :unhandled_error
  rescue_from ActionController::InvalidAuthenticityToken,
    with: :invalid_authenticity_token

  protect_from_forgery with: :exception

  before_action :snake_case_params, :attach_authenticity_token

  def test
    if params.has_key?(:login)
      login!(User.first)
    elsif params.has_key?(:logout)
      logout!
    end

    if current_user
      render json: { user: current_user.slice('id', 'email', 'session_token')}
    else
      render json: ['no current user']
    end
  end

  def current_user
    # @current_user ||= user whose `session_token` == token in `session` cookie
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    # reset `user`'s `session_token` and store in `session` cookie
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    # reset the `current_user`'s session cookie, if one exists
    # clear out token from `session` cookie
    # @current_user = nil so that subsequent calls to `current_user` return nil
    current_user.reset_session_token! if current_user
    session[:session_token] = nil
    @current_user = nil
  end

  def require_logged_in
    unless current_user
      render json: { message: 'Unauthorized' }, status: :unauthorized
    end
  end

  private
  def snake_case_params
    # before any controller action are hit, params are transformed from camelCase frontend request to snake_case
    # any JSON data in the request body from frontend
    params.deep_transform_keys!(&:underscore)
  end

  def attach_authenticity_token
    headers['X-CSRF-Token'] = masked_authenticity_token(session)
    # form_authenticity_token helper used in views calls the masked_authenticity_token(session)
  end

  def invalid_authenticity_token
    # whenever InvalidAuthenticityToken error is raised, this method is run with custom JSON response
    render json: { message: 'Invalid authenticity token' },
      status: :unprocessable_entity
  end

  def unhandled_error(error)
    # error other than invalid auth token, unhandled error run
    if request.accepts.first.html?
      # check if request is looking for HTML response (based on Accepts header)
      # Accepts header: part of HTTP request that indicates media types that client is able to handle in the response
      # used by web browser(client) to specify expected content type of response from server
      # this means that it's not a fetch request -> raise error
      raise error
    else
      @message = "#{error.class} - #{error.message}"
      @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
      # creates a more readable stack trace
      render 'api/errors/internal_server_error', status: :internal_server_error

      logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
      # log the error message using logger.error and stack trace in server log
    end
  end
end
