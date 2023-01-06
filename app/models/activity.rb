class Activity < ApplicationRecord

  validates :prompt,
    presence: true
  validates :type,
    presence: true
  validates :body,
    presence: true

  belongs_to: 

end
