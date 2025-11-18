// This file handles all API calls to your Spring Boot backend
import api from '../Services/ApiRequestInterceptor';

// We no longer need this, as the 'api' instance has the baseURL
// const API_BASE_URL = 'http://localhost:8080/api/v1';

const eventService = {

  /**
   * Creates a new event.
   * @param {object} eventData - The event data to send.
   * @returns {Promise<object>} The data from the API response.
   */
  createEvent: async (eventData) => {
    try {
      // Use 'api.post'
      // - 1st arg: The relative path (assuming 'api' is configured to '.../api')
      // - 2nd arg: The data object (axios handles stringify)
      const response = await api.post('/events/create-new', eventData);
      
      // axios puts the response data in the 'data' property
      return response.data;

    } catch (error) {
      // This catch block will now handle non-auth errors (like 400, 500)
      const message = error.response?.data?.message || error.message || 'Failed to create event';
      console.error('Error creating new event: ', message);
      throw new Error(message);
    }
  },

  /**
   * Fetches all events.
   * @returns {Promise<object>} The data from the API response.
   */
  getAllEvents: async () => {
    try {
      // Use 'api.get'
      // - No headers, method, or body needed
      const response = await api.get('/events/all');
      
      // axios puts the response data in the 'data' property
      return response.data;

    } catch (error) {
      // This catch block will now handle non-auth errors
      const message = error.response?.data?.message || error.message || 'Failed to fetch events';
      console.error('Error fetching events:', message);
      throw new Error(message);
    }
  },

};

export default eventService;