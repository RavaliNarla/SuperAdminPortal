import { useEffect, useState } from 'react';
import portalScreensApiService from '../../../../services/portalScreensApiService';

// Fetches the configurable-forms catalog (portal + screenKey + screenName)
// from GET /portalScreens. Inactive screens are dropped so a screen can be
// retired from the picker without deleting its saved field schema.
export default function usePortalScreens() {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    portalScreensApiService
      .getPortalScreens()
      .then((body) => {
        if (cancelled) return;
        setScreens((body?.data || []).filter((screen) => screen.isActive));
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setScreens([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { screens, loading, error };
}
