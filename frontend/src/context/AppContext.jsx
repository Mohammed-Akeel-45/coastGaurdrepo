import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock Data for Demo Mode - Indian Coastal Areas
const MOCK_DATA = {
  users: {
    citizen: {
      userName: 'Rajesh Kumar',
      email: 'citizen@demo.com',
      role: 'citizen',
      phone: '+919876543210'
    },
    official: {
      userName: 'Dr. Priya Sharma',
      email: 'official@demo.com',
      role: 'official',
      phone: '+919876543211'
    },
    analyst: {
      userName: 'Amit Patel',
      email: 'analyst@demo.com',
      role: 'analyst',
      phone: '+919876543212'
    }
  },
  reports: [
    {
      report_id: 1,
      user_id: 1,
      type_id: 1,
      type_name: 'Tsunami',
      status_id: 2,
      status_name: 'official_verified',
      description: 'Unusual wave patterns observed. Water receding from shore rapidly. Local fishermen reporting strange sea behavior.',
      location: { type: 'Point', coordinates: [80.2707, 13.0827] },
      location_name: 'Marina Beach, Chennai, Tamil Nadu',
      report_time: '2024-11-18T06:30:00Z',
      media_urls: ['https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'],
      relevance_score: 95
    },
    {
      report_id: 2,
      user_id: 2,
      type_id: 3,
      type_name: 'Oil Spill',
      status_id: 1,
      status_name: 'not_verified',
      description: 'Large oil slick spotted near the port. Black residue on water surface affecting marine life.',
      location: { type: 'Point', coordinates: [72.8311, 18.9388] },
      location_name: 'Gateway of India, Mumbai, Maharashtra',
      report_time: '2024-11-18T08:45:00Z',
      media_urls: ['https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800'],
      relevance_score: 87
    },
    {
      report_id: 3,
      user_id: 3,
      type_id: 2,
      type_name: 'High Wave',
      status_id: 3,
      status_name: 'community_verified',
      description: 'Extremely high waves crashing on shore. Strong winds and dangerous currents. Beach evacuation recommended.',
      location: { type: 'Point', coordinates: [73.0169, 19.0176] },
      location_name: 'Alibaug Beach, Maharashtra',
      report_time: '2024-11-18T07:15:00Z',
      media_urls: ['https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800'],
      relevance_score: 92
    },
    {
      report_id: 4,
      user_id: 4,
      type_id: 4,
      type_name: 'Flooding',
      status_id: 1,
      status_name: 'not_verified',
      description: 'Coastal flooding in low-lying residential areas. Water level rising due to high tide and heavy rainfall.',
      location: { type: 'Point', coordinates: [88.3639, 22.5726] },
      location_name: 'Kolkata Port Area, West Bengal',
      report_time: '2024-11-18T05:00:00Z',
      media_urls: ['https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800'],
      relevance_score: 88
    },
    {
      report_id: 5,
      user_id: 1,
      type_id: 1,
      type_name: 'Tsunami',
      status_id: 1,
      status_name: 'not_verified',
      description: 'Earthquake tremors felt strongly. Coastal residents reporting unusual sea activity. Possible tsunami warning.',
      location: { type: 'Point', coordinates: [92.7265, 11.6234] },
      location_name: 'Port Blair, Andaman and Nicobar Islands',
      report_time: '2024-11-18T09:30:00Z',
      media_urls: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'],
      relevance_score: 98
    },
    {
      report_id: 6,
      user_id: 2,
      type_id: 2,
      type_name: 'High Wave',
      status_id: 2,
      status_name: 'official_verified',
      description: 'Storm surge creating dangerous wave conditions. Multiple boats damaged at the harbor.',
      location: { type: 'Point', coordinates: [75.7139, 11.2588] },
      location_name: 'Kozhikode Beach, Kerala',
      report_time: '2024-11-18T10:00:00Z',
      media_urls: ['https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'],
      relevance_score: 90
    },
    {
      report_id: 7,
      user_id: 3,
      type_id: 4,
      type_name: 'Flooding',
      status_id: 1,
      status_name: 'not_verified',
      description: 'Cyclone aftermath causing severe coastal flooding. Roads submerged, people evacuating.',
      location: { type: 'Point', coordinates: [85.8245, 20.2961] },
      location_name: 'Puri Beach, Odisha',
      report_time: '2024-11-18T06:00:00Z',
      media_urls: ['https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800'],
      relevance_score: 94
    },
    {
      report_id: 8,
      user_id: 4,
      type_id: 3,
      type_name: 'Oil Spill',
      status_id: 4,
      status_name: 'debunked',
      description: 'Suspected oil spill near the coast.',
      location: { type: 'Point', coordinates: [70.0022, 22.4707] },
      location_name: 'Mandvi Beach, Gujarat',
      report_time: '2024-11-18T04:30:00Z',
      media_urls: [],
      relevance_score: 45
    },
    {
      report_id: 9,
      user_id: 1,
      type_id: 2,
      type_name: 'High Wave',
      status_id: 3,
      status_name: 'community_verified',
      description: 'Unusually high tidal waves affecting fishing activities. Fishermen warned to stay ashore.',
      location: { type: 'Point', coordinates: [74.7821, 12.9141] },
      location_name: 'Mangalore Beach, Karnataka',
      report_time: '2024-11-18T07:45:00Z',
      media_urls: ['https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800'],
      relevance_score: 85
    },
    {
      report_id: 10,
      user_id: 2,
      type_id: 4,
      type_name: 'Flooding',
      status_id: 1,
      status_name: 'not_verified',
      description: 'Monsoon-induced flooding in coastal villages. Emergency services deployed.',
      location: { type: 'Point', coordinates: [73.8278, 15.2993] },
      location_name: 'Panjim Beach, Goa',
      report_time: '2024-11-18T08:20:00Z',
      media_urls: ['https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800'],
      relevance_score: 91
    },
    {
      report_id: 11,
      user_id: 3,
      type_id: 1,
      type_name: 'Tsunami',
      status_id: 1,
      status_name: 'not_verified',
      description: 'Seismic activity detected underwater. Monitoring for potential tsunami threat.',
      location: { type: 'Point', coordinates: [79.8083, 11.9139] },
      location_name: 'Pondicherry Beach, Puducherry',
      report_time: '2024-11-18T09:00:00Z',
      media_urls: ['https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'],
      relevance_score: 89
    },
    {
      report_id: 12,
      user_id: 4,
      type_id: 2,
      type_name: 'High Wave',
      status_id: 2,
      status_name: 'official_verified',
      description: 'Tropical depression causing hazardous wave conditions. Tourist activities suspended.',
      location: { type: 'Point', coordinates: [78.1348, 8.0883] },
      location_name: 'Kanyakumari Beach, Tamil Nadu',
      report_time: '2024-11-18T10:15:00Z',
      media_urls: ['https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800'],
      relevance_score: 93
    },
    {
      report_id: 13,
      user_id: 1,
      type_id: 3,
      type_name: 'Oil Spill',
      status_id: 1,
      status_name: 'not_verified',
      description: 'Oil leakage from cargo ship spotted. Environmental hazard to marine ecosystem.',
      location: { type: 'Point', coordinates: [82.7739, 18.9322] },
      location_name: 'Visakhapatnam Port, Andhra Pradesh',
      report_time: '2024-11-18T07:30:00Z',
      media_urls: ['https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800'],
      relevance_score: 86
    },
    {
      report_id: 14,
      user_id: 2,
      type_id: 4,
      type_name: 'Flooding',
      status_id: 1,
      status_name: 'not_verified',
      description: 'Storm surge flooding coastal roads. Traffic disrupted, rescue operations underway.',
      location: { type: 'Point', coordinates: [69.6293, 21.6417] },
      location_name: 'Diu Beach, Daman and Diu',
      report_time: '2024-11-18T06:45:00Z',
      media_urls: [],
      relevance_score: 82
    },
    {
      report_id: 15,
      user_id: 3,
      type_id: 2,
      type_name: 'High Wave',
      status_id: 3,
      status_name: 'community_verified',
      description: 'Rough sea conditions with waves exceeding 4 meters. Red flag warning issued.',
      location: { type: 'Point', coordinates: [76.2673, 9.9312] },
      location_name: 'Kochi Beach, Kerala',
      report_time: '2024-11-18T08:50:00Z',
      media_urls: ['https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800'],
      relevance_score: 88
    }
  ],
  socialPosts: [
    {
      post_id: 1,
      platform: 'Twitter',
      author_name: '@ChennaiCoastWatch',
      content: '🌊 High tide alert at Marina Beach! Strong winds and rough seas. Stay safe and avoid beach activities. #ChennaiWeather #CoastalSafety',
      latitude: 13.0827,
      longitude: 80.2707,
      location_name: 'Marina Beach, Chennai',
      post_time: '2024-11-18T06:00:00Z',
      sentiment: 'Negative',
      relevance_score: 89,
      media_url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800'
    },
    {
      post_id: 2,
      platform: 'Facebook',
      author_name: 'Mumbai Marine Conservation',
      content: '⚠️ Oil spill detected near Gateway of India. Marine cleanup crew deployed. Please report any affected wildlife. #MumbaiCoast #MarineLife',
      latitude: 18.9388,
      longitude: 72.8311,
      location_name: 'Mumbai Coastline',
      post_time: '2024-11-18T08:30:00Z',
      sentiment: 'Negative',
      relevance_score: 92,
      media_url: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800'
    },
    {
      post_id: 3,
      platform: 'Instagram',
      author_name: '@GoaBeachLife',
      content: 'Beautiful calm morning at Panjim Beach! Perfect weather for beach activities 🌅🏖️ #Goa #BeachVibes',
      latitude: 15.2993,
      longitude: 73.8278,
      location_name: 'Panjim, Goa',
      post_time: '2024-11-18T05:30:00Z',
      sentiment: 'Positive',
      relevance_score: 35,
      media_url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'
    },
    {
      post_id: 4,
      platform: 'Twitter',
      author_name: '@KolkataPortAuth',
      content: '🚨 ALERT: Coastal flooding in port areas due to heavy rains and high tide. Avoid low-lying areas. Emergency helpline: 1800-xxx-xxxx #KolkataFlood',
      latitude: 22.5726,
      longitude: 88.3639,
      location_name: 'Kolkata Port',
      post_time: '2024-11-18T05:15:00Z',
      sentiment: 'Negative',
      relevance_score: 94,
      media_url: null
    },
    {
      post_id: 5,
      platform: 'Facebook',
      author_name: 'Andaman Tourism Official',
      content: '⚠️ Earthquake tremors felt in Port Blair. Coastal residents advised to move to higher ground as precaution. Tsunami warning monitoring in progress.',
      latitude: 11.6234,
      longitude: 92.7265,
      location_name: 'Port Blair, Andaman',
      post_time: '2024-11-18T09:15:00Z',
      sentiment: 'Negative',
      relevance_score: 97,
      media_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    },
    {
      post_id: 6,
      platform: 'Instagram',
      author_name: '@KeralaCoast',
      content: 'Storm warning! 🌧️ Heavy rainfall and strong waves hitting Kozhikode beach. Stay indoors and safe! #KeralaWeather',
      latitude: 11.2588,
      longitude: 75.7139,
      location_name: 'Kozhikode, Kerala',
      post_time: '2024-11-18T09:45:00Z',
      sentiment: 'Neutral',
      relevance_score: 88,
      media_url: null
    },
    {
      post_id: 7,
      platform: 'Twitter',
      author_name: '@OdishaDisasterMgmt',
      content: 'Cyclone aftermath: Severe flooding in Puri coastal areas. NDRF teams deployed. Citizens requested to cooperate with rescue operations. #OdishaCyclone',
      latitude: 20.2961,
      longitude: 85.8245,
      location_name: 'Puri, Odisha',
      post_time: '2024-11-18T06:20:00Z',
      sentiment: 'Negative',
      relevance_score: 96,
      media_url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800'
    },
    {
      post_id: 8,
      platform: 'Facebook',
      author_name: 'Mangalore Fisheries Dept',
      content: '🎣 High wave alert! Fishermen advised not to venture into the sea for next 48 hours. Safety first! #MangaloreCoast #FishermenSafety',
      latitude: 12.9141,
      longitude: 74.7821,
      location_name: 'Mangalore, Karnataka',
      post_time: '2024-11-18T07:30:00Z',
      sentiment: 'Neutral',
      relevance_score: 85,
      media_url: null
    }
  ],
  hotspots: [
    {
      hotspot_id: 1,
      location: { type: 'Point', coordinates: [80.2707, 13.0827] },
      radius_km: 3.2,
      intensity_score: 8.5,
      dominant_hazard_type_id: 1,
      created_at: '2024-11-18T06:00:00Z',
      updated_at: '2024-11-18T10:00:00Z'
    },
    {
      hotspot_id: 2,
      location: { type: 'Point', coordinates: [72.8311, 18.9388] },
      radius_km: 2.8,
      intensity_score: 7.2,
      dominant_hazard_type_id: 3,
      created_at: '2024-11-18T08:00:00Z',
      updated_at: '2024-11-18T10:00:00Z'
    },
    {
      hotspot_id: 3,
      location: { type: 'Point', coordinates: [88.3639, 22.5726] },
      radius_km: 4.5,
      intensity_score: 9.1,
      dominant_hazard_type_id: 4,
      created_at: '2024-11-18T05:00:00Z',
      updated_at: '2024-11-18T10:00:00Z'
    },
    {
      hotspot_id: 4,
      location: { type: 'Point', coordinates: [92.7265, 11.6234] },
      radius_km: 5.0,
      intensity_score: 9.8,
      dominant_hazard_type_id: 1,
      created_at: '2024-11-18T09:00:00Z',
      updated_at: '2024-11-18T10:00:00Z'
    },
    {
      hotspot_id: 5,
      location: { type: 'Point', coordinates: [85.8245, 20.2961] },
      radius_km: 3.8,
      intensity_score: 8.9,
      dominant_hazard_type_id: 4,
      created_at: '2024-11-18T06:00:00Z',
      updated_at: '2024-11-18T10:00:00Z'
    }
  ]
};

export const AppProvider = ({ children }) => {
  const [demoMode, setDemoMode] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [reports, setReports] = useState([]);
  const [myReports, setMyReports] = useState([]);
  const [socialPosts, setSocialPosts] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [currentView, setCurrentView] = useState('map');
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [mapLayers, setMapLayers] = useState({
    hotspots: true,
    reports: true,
    socialPosts: false,
  });

  useEffect(() => {
    if (token) {
      if (demoMode) {
        setReports(MOCK_DATA.reports);
        setMyReports(MOCK_DATA.reports.slice(0, 3));
        setSocialPosts(MOCK_DATA.socialPosts);
        setHotspots(MOCK_DATA.hotspots);
      } else {
        fetchUserProfile();
        fetchReports();
        fetchHotspots();
        fetchSocialPosts();
      }
    }
  }, [token, demoMode]);

  const fetchUserProfile = async () => {
    if (demoMode) return;
    try {
      const data = await apiService.getUserProfile(token);
      if (data.data) {
        setUser(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchReports = async () => {
    if (demoMode) {
      setReports(MOCK_DATA.reports);
      return;
    }
    try {
      const data = await apiService.getReports(50);
      setReports(data.data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchMyReports = async () => {
    if (demoMode) {
      setMyReports(MOCK_DATA.reports.slice(0, 3));
      return;
    }
    try {
      const data = await apiService.getMyReports(token);
      setMyReports(data.data || []);
    } catch (error) {
      console.error('Error fetching my reports:', error);
    }
  };

  const fetchHotspots = async () => {
    if (demoMode) {
      setHotspots(MOCK_DATA.hotspots);
      return;
    }
    try {
      const data = await apiService.getHotspots();
      setHotspots(data || []);
    } catch (error) {
      console.error('Error fetching hotspots:', error);
    }
  };

  const fetchSocialPosts = async () => {
    if (demoMode) {
      setSocialPosts(MOCK_DATA.socialPosts);
      return;
    }
    try {
      const data = await apiService.getSocialPosts(token, 50);
      setSocialPosts(data.data || []);
    } catch (error) {
      console.error('Error fetching social posts:', error);
    }
  };

  const login = async (email, password) => {
    if (demoMode) {
      let mockUser = MOCK_DATA.users.citizen;
      if (email.includes('official')) {
        mockUser = MOCK_DATA.users.official;
      } else if (email.includes('analyst')) {
        mockUser = MOCK_DATA.users.analyst;
      }

      setUser(mockUser);
      setToken('demo-token-12345');
      return { success: true };
    }

    try {
      const data = await apiService.login(email, password);
      if (data.data?.token) {
        setToken(data.data.token);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  const register = async (userName, email, password, phone) => {
    if (demoMode) {
      const mockUser = { ...MOCK_DATA.users.citizen, userName, email, phone };
      setUser(mockUser);
      setToken('demo-token-12345');
      return { success: true };
    }

    try {
      const data = await apiService.register(userName, email, password, phone);
      if (data.data?.token) {
        setToken(data.data.token);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setReports([]);
    setMyReports([]);
    setSocialPosts([]);
    setHotspots([]);
  };

  const submitReport = async (reportData) => {
    if (demoMode) {
      const newReport = {
        report_id: Date.now(),
        user_id: 1,
        type_id: reportData.type_id,
        type_name:
          MOCK_DATA.reports.find((r) => r.type_id === reportData.type_id)?.type_name || 'Hazard',
        status_id: 1,
        status_name: 'not_verified',
        description: reportData.text,
        location: {
          type: 'Point',
          coordinates: [parseFloat(reportData.longitude), parseFloat(reportData.latitude)],
        },
        location_name: reportData.location_name,
        report_time: new Date().toISOString(),
        media_urls: [],
        relevance_score: Math.floor(Math.random() * 30) + 70,
      };

      setReports((prev) => [newReport, ...prev]);
      setMyReports((prev) => [newReport, ...prev]);
      return { success: true };
    }

    try {
      const response = await apiService.submitReport(token, reportData);
      if (response.ok) {
        fetchReports();
        fetchMyReports();
        return { success: true };
      }
      return { success: false, message: 'Failed to submit report' };
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  const verifyReport = async (reportId) => {
    if (demoMode) {
      // Update report status in demo mode
      setReports((prev) =>
        prev.map((r) =>
          r.report_id === reportId
            ? { ...r, status_id: 2, status_name: 'official_verified' }
            : r
        )
      );
      return { success: true };
    }

    try {
      const response = await apiService.verifyReport(token, reportId);
      if (response.ok) {
        fetchReports();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  };

  const debunkReport = async (reportId) => {
    if (demoMode) {
      // Update report status in demo mode
      setReports((prev) =>
        prev.map((r) =>
          r.report_id === reportId ? { ...r, status_id: 4, status_name: 'debunked' } : r
        )
      );
      return { success: true };
    }

    try {
      const response = await apiService.debunkReport(token, reportId);
      if (response.ok) {
        fetchReports();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  };

  return (
    <AppContext.Provider
      value={{
        demoMode,
        setDemoMode,
        user,
        token,
        reports,
        myReports,
        socialPosts,
        hotspots,
        currentView,
        setCurrentView,
        selectedReport,
        setSelectedReport,
        selectedPost,
        setSelectedPost,
        mapLayers,
        setMapLayers,
        login,
        register,
        logout,
        submitReport,
        verifyReport,
        debunkReport,
        fetchReports,
        fetchMyReports,
        fetchHotspots,
        fetchSocialPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import apiService from '../services/api';

// const AppContext = createContext();

// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useApp must be used within AppProvider');
//   }
//   return context;
// };

// export const AppProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [myReports, setMyReports] = useState([]);
//   const [socialPosts, setSocialPosts] = useState([]);
//   const [hotspots, setHotspots] = useState([]);
//   const [currentView, setCurrentView] = useState('map');
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [mapLayers, setMapLayers] = useState({
//     hotspots: true,
//     reports: true,
//     socialPosts: false,
//   });

//   useEffect(() => {
//     if (token) {
//       fetchUserProfile();
//       fetchReports();
//       fetchHotspots();
//       fetchSocialPosts();
//     }
//   }, [token]);

//   const fetchUserProfile = async () => {
//     try {
//       const data = await apiService.getUserProfile(token);
//       if (data.data) {
//         setUser(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const fetchReports = async () => {
//     try {
//       const data = await apiService.getReports(50);
//       setReports(data.data || []);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//   };

//   const fetchMyReports = async () => {
//     try {
//       const data = await apiService.getMyReports(token);
//       setMyReports(data.data || []);
//     } catch (error) {
//       console.error('Error fetching my reports:', error);
//     }
//   };

//   const fetchHotspots = async () => {
//     try {
//       const data = await apiService.getHotspots();
//       setHotspots(data || []);
//     } catch (error) {
//       console.error('Error fetching hotspots:', error);
//     }
//   };

//   const fetchSocialPosts = async () => {
//     try {
//       const data = await apiService.getSocialPosts(token, 50);
//       setSocialPosts(data.data || []);
//     } catch (error) {
//       console.error('Error fetching social posts:', error);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const data = await apiService.login(email, password);
//       if (data.data?.token) {
//         setToken(data.data.token);
//         return { success: true };
//       }
//       return { success: false, message: data.message };
//     } catch (error) {
//       return { success: false, message: 'Network error' };
//     }
//   };

//   const register = async (userName, email, password, phone) => {
//     try {
//       const data = await apiService.register(userName, email, password, phone);
//       if (data.data?.token) {
//         setToken(data.data.token);
//         return { success: true };
//       }
//       return { success: false, message: data.message };
//     } catch (error) {
//       return { success: false, message: 'Network error' };
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//   };

//   const submitReport = async (reportData) => {
//     try {
//       const response = await apiService.submitReport(token, reportData);
//       if (response.ok) {
//         fetchReports();
//         fetchMyReports();
//         return { success: true };
//       }
//       return { success: false, message: 'Failed to submit report' };
//     } catch (error) {
//       return { success: false, message: 'Network error' };
//     }
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         token,
//         reports,
//         myReports,
//         socialPosts,
//         hotspots,
//         currentView,
//         setCurrentView,
//         selectedReport,
//         setSelectedReport,
//         selectedPost,
//         setSelectedPost,
//         mapLayers,
//         setMapLayers,
//         login,
//         register,
//         logout,
//         submitReport,
//         fetchReports,
//         fetchMyReports,
//         fetchHotspots,
//         fetchSocialPosts,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };