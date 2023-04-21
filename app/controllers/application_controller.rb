class ApplicationController < ActionController::API
  before_action :snake_case_params

  private
  def snake_case_params
    params.deep_transform_keys!(&:underscore)
  end
end

# before any controller action are hit, params are transformed from camelCase frontend request to snake_case
# any JSON data in the request body from frontend 
