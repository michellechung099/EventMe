class Api::UsersController < ApplicationController
  wrap_parameters :user, include: [:email, :first_name, :last_name] + ['password']
  # overrides what keys i want Rails to auto nest in requests to sign up that's not technically a User attribute (password_digest is)

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
