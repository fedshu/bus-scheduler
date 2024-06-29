import { createStore } from 'vuex'
import { getStops } from '@/repository'
import { State } from "@/types/State";
import { Line } from '@/types/Line';

export default createStore({
  state: new State(),
  getters: {
    getLines: (state): Line[] => {
      return state.getAllLines()
    },
  },
  mutations:
  {
    setError: (state, payload) => {
      console.log('Error: ', payload);

      state.error = payload
    },
    setLoading: (state, payload) => {
      state.isLoading = payload
    },
  },
  actions: {
    getBusLines: async ({ commit, state }) => {
      try {
        commit("setLoading", true)

        const res = await getStops()

        if (res.status == 200) {
          state.updateBusLinesByApiResponse(res.data)
        } else {
          commit("setError", new Error("Something went wrong."));
        }
      } catch (e) {
        commit("setError", new Error("Something went wrong."));
      } finally {
        commit("setLoading", false);
      }
    },
  },
})
