class PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    post = Post.new(post_params)
    post.user_id = 1
    post.save
    render json: post
    # if post.save
    #   render json: post
    # else
    #   render json: post.errors
    # end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
  end

  private

  def post_params
    params.require(:post).permit(:content)
  end
end
