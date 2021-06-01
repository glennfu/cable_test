class TestController < ApplicationController
  
  def do_thing
    # redirect_to root_path, notice: 'You have done the thing.'
    render inline: "window.dispatchEvent('hello:reload'); Turbolinks.clearCache(); Turbolinks.visit(\"http://localhost:3000/\", {\"action\":\"replace\"});"
  end
  
end
