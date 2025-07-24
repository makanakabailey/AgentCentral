import { useState, useEffect, useCallback } from "react";
import { Search, MapPin, Globe, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LocationSuggestion {
  id: string;
  name: string;
  description: string;
  type: 'country' | 'region' | 'city' | 'custom';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface LocationSearchProps {
  value: string;
  onChange: (location: string) => void;
  placeholder?: string;
  className?: string;
}

export default function LocationSearch({ 
  value, 
  onChange, 
  placeholder = "Search locations...",
  className = "" 
}: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock location data - in production, this would use Google Places API
  const mockLocations: LocationSuggestion[] = [
    {
      id: "global",
      name: "Global",
      description: "Worldwide coverage",
      type: "custom"
    },
    {
      id: "north-america",
      name: "North America",
      description: "United States, Canada, Mexico",
      type: "region"
    },
    {
      id: "europe",
      name: "Europe",
      description: "European Union and surrounding countries",
      type: "region"
    },
    {
      id: "asia-pacific",
      name: "Asia Pacific",
      description: "East Asia, Southeast Asia, Oceania",
      type: "region"
    },
    {
      id: "latin-america",
      name: "Latin America",
      description: "South and Central America",
      type: "region"
    },
    {
      id: "usa",
      name: "United States",
      description: "All 50 states and territories",
      type: "country",
      coordinates: { lat: 39.8283, lng: -98.5795 }
    },
    {
      id: "canada",
      name: "Canada",
      description: "All provinces and territories",
      type: "country",
      coordinates: { lat: 56.1304, lng: -106.3468 }
    },
    {
      id: "uk",
      name: "United Kingdom",
      description: "England, Scotland, Wales, Northern Ireland",
      type: "country",
      coordinates: { lat: 55.3781, lng: -3.4360 }
    },
    {
      id: "germany",
      name: "Germany",
      description: "Federal Republic of Germany",
      type: "country",
      coordinates: { lat: 51.1657, lng: 10.4515 }
    },
    {
      id: "australia",
      name: "Australia",
      description: "All states and territories",
      type: "country",
      coordinates: { lat: -25.2744, lng: 133.7751 }
    },
    {
      id: "new-york",
      name: "New York, NY",
      description: "New York City metropolitan area",
      type: "city",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: "london",
      name: "London, UK",
      description: "Greater London area",
      type: "city",
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    {
      id: "tokyo",
      name: "Tokyo, Japan",
      description: "Tokyo metropolitan area",
      type: "city",
      coordinates: { lat: 35.6762, lng: 139.6503 }
    },
    {
      id: "san-francisco",
      name: "San Francisco, CA",
      description: "San Francisco Bay Area",
      type: "city",
      coordinates: { lat: 37.7749, lng: -122.4194 }
    }
  ];

  const searchLocations = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions(mockLocations.slice(0, 8));
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const filtered = mockLocations.filter(location =>
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSuggestions(filtered.slice(0, 8));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    searchLocations(searchQuery);
  }, [searchQuery, searchLocations]);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const handleSelect = (location: LocationSuggestion) => {
    setSearchQuery(location.name);
    onChange(location.name);
    setIsOpen(false);
  };

  const getLocationIcon = (type: LocationSuggestion['type']) => {
    switch (type) {
      case 'country':
        return <Globe className="w-4 h-4" />;
      case 'region':
        return <MapPin className="w-4 h-4" />;
      case 'city':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getLocationBadgeColor = (type: LocationSuggestion['type']) => {
    switch (type) {
      case 'country':
        return 'bg-blue-500/20 text-blue-300';
      case 'region':
        return 'bg-green-500/20 text-green-300';
      case 'city':
        return 'bg-purple-500/20 text-purple-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-dark-surface/50 border-dark-accent/30 focus:border-dark-accent/50"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto holographic border-dark-accent/30">
          <CardContent className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-dark-accent"></div>
                <span className="ml-2 text-sm text-gray-400">Searching locations...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-1">
                {suggestions.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleSelect(location)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-dark-surface/50 transition-colors text-left"
                  >
                    <div className="text-dark-accent">
                      {getLocationIcon(location.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white truncate">
                          {location.name}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getLocationBadgeColor(location.type)}`}
                        >
                          {location.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {location.description}
                      </p>
                    </div>
                    {location.coordinates && (
                      <div className="text-xs text-gray-500 font-mono">
                        {location.coordinates.lat.toFixed(2)}, {location.coordinates.lng.toFixed(2)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-4">
                <MapPin className="w-6 h-6 text-gray-400 mr-2" />
                <span className="text-sm text-gray-400">No locations found</span>
              </div>
            )}
            
            {searchQuery && !isLoading && (
              <div className="border-t border-dark-accent/20 mt-2 pt-2">
                <button
                  onClick={() => handleSelect({ 
                    id: 'custom', 
                    name: searchQuery, 
                    description: 'Custom location', 
                    type: 'custom' 
                  })}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-dark-surface/50 transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-dark-accent" />
                  <div>
                    <span className="text-sm text-white">Use "{searchQuery}"</span>
                    <p className="text-xs text-gray-400">Custom location</p>
                  </div>
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}