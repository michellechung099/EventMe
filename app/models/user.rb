# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :email,
    uniqueness: true,
    length: { in: 3..255 },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :last_name, presence: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 8 }, allow_nil: true

  before_validation :ensure_session_token

  has_many :events,
    dependent: :destroy

  has_many :tickets,
    dependent: :destroy 

  def self.find_by_credentials(email, password)
    # `email` if `credential` matches `URI::MailTo::EMAIL_REGEXP`
    # find the user whose email/username is equal to `credential`

    # if no such user exists, return a falsey value

    # if a matching user exists, use `authenticate` to check the provided password
    # return the user if the password is correct, otherwise return a falsey value
    user = User.find_by(email: email)
    if user&.authenticate(password)
      user
    else
      nil
    end
  end

  def reset_session_token!
    # `update!` the user's session token to a new, random token
    # return the new session token, for convenience
    self.update!(session_token: generate_unique_session_token)
    return self.session_token
  end

  private
  def generate_unique_session_token
    loop do
    # use SecureRandom.base64 to generate a random token
    # use `User.exists?` to check if this `session_token` is already in use
    # if already in use, continue the loop, generating a new token
    # if not in use, return the token
    token = SecureRandom.base64
    break token unless User.exists?(session_token: token)
    end

  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
