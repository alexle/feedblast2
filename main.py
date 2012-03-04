import os
import cgi
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext import db
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

class UserInfo( db.Model ):
   name = db.UserProperty()
   language = db.StringProperty()

class Settings(webapp.RequestHandler):
   def post( self ):
      lang = UserInfo()

      lang.language = self.request.get('content')

class MainPage( webapp.RequestHandler ):
   def get( self ):
      if users.get_current_user():
         url = users.create_logout_url(self.request.uri)
         #path = os.path.join( os.path.dirname(__file__), 'feedblast.html' )
      else:
         url = users.create_login_url(self.request.uri)
         #path = os.path.join( os.path.dirname(__file__), 'index.html' )

      user = users.get_current_user()

      template_values = {
         'url': url,
         'user': user
      }

      path = os.path.join( os.path.dirname(__file__), 'feedblast.html' )
      self.response.out.write( template.render( path, template_values ) )

class AboutPage( webapp.RequestHandler ):
   def get( self):
      form_values = {}

      path = os.path.join( os.path.dirname(__file__), 'about.html' )
      self.response.out.write( template.render( path, form_values ) )

application = webapp.WSGIApplication([
   ('/', MainPage),
   ('/about', AboutPage),
], debug=True )

def main():
   run_wsgi_app( application)

if __name__ == '__main__':
   main()


