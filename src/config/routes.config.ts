export const ROUTES = {
  API: {
    LAPS: {
      APPROVE: '/api/laps/approve',
      MODIFY: '/api/laps/modify',
      REJECT: '/api/laps/reject',
      CREATE: '/add-laptime/api',
      MOTORCYCLES: '/add-laptime/api/motorcycles',
      TYRES_FRONT: '/add-laptime/api/tyres/front',
      TYRES_REAR: '/add-laptime/api/tyres/rear',
      RIDERS: '/add-laptime/api/riders',
      ORGANIZERS: '/add-laptime/api/organizers'
    },
    MANAGEMENT: {
      MOTORCYCLE: '/api/management/motorcycle',
      TYRE: '/api/management/tyres',
      RIDER: '/api/management/rider'
    },
    LEADERBOARD: {
      FILTER: '/leaderboard/filter'
    }
  },
  PAGES: {
    ROOT: '/',
    LEADERBOARD: '/leaderboard',
    ADD_LAPTIME: '/add-laptime',
    LAP_DETAILS: '/lap-details'
  }
};