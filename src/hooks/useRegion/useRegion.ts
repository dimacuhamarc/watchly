import { useState, useEffect } from 'react';

interface RegionData {
  countryCode: string | null;
  countryName: string | null;
  loading: boolean;
  error: string | null;
}

export function useRegion() {
  const [regionData, setRegionData] = useState<RegionData>({
    countryCode: null,
    countryName: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Failed to fetch region data');
        
        const data = await response.json();
        setRegionData({
          countryCode: data.country_code,
          countryName: data.country_name,
          loading: false,
          error: null
        });
      } catch (error) {
        setRegionData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch region'
        }));
      }
    };

    void fetchRegion();
  }, []);

  return regionData;
}