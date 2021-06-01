class TestController < ApplicationController
  
  def do_thing
    redirect_to root_path, notice: 'You have done the thing.'
  end
  
end
