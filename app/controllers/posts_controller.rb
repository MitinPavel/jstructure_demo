class PostsController < ApplicationController

  def index
    @posts = Post.all
  end

  def create
    @post = Post.new params[:post]
    if @post.save
      @post = Post.new
    end
    @posts = Post.all
  end
end
