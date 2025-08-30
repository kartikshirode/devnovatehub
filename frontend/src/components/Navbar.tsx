import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Navbar = () => {
  const isAuthenticated = false // Will be managed by context later

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            DevnovateHub
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/explore" className="text-gray-600 hover:text-gray-900">
              Explore
            </Link>
            <Link to="/trending" className="text-gray-600 hover:text-gray-900">
              Trending
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/write">Write</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {/* logout logic */}}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
