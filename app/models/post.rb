class Post < ActiveRecord::Base
  validates :content, :presence => true
end
