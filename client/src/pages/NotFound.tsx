
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-purple">
      <div className="glass-card p-12 rounded-xl text-center max-w-md w-full animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-brand-purple">404</h1>
        <p className="text-xl text-gray-800 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Button 
          onClick={() => navigate('/')}
          className="gradient-purple"
          size="lg"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
