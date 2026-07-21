import { api } from '../core/service/apiService';

const portalScreensApiService = {
  getPortalScreens: () => api.get('/portalScreens'),
};

export default portalScreensApiService;
