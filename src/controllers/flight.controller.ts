import flightServices from "@/services/flight.service";
import { IBodyFlight } from "@/types/flight";
import { IPayload } from "@/types/jwt";
import { IParams } from "@/types/params";

const flightController = {
  getAllFlight: async ({ store }: { store: { user: IPayload } }) => {
    return flightServices.getAllFlight(store.user);
  },

  getFlightById: async ({
    params,
    store,
  }: {
    params: IParams;
    store: { user: IPayload };
  }) => flightServices.getFlightById(params.uuid, store.user),

  createFlight: async ({
    body,
    store,
  }: {
    body: IBodyFlight;
    store: { user: IPayload };
  }) => flightServices.createFlight(body, store.user),

  updateFlight: async ({
    params,
    body,
    store,
  }: {
    params: IParams;
    body: IBodyFlight;
    store: { user: IPayload };
  }) => flightServices.updateFlight(body, params.uuid, store.user),
  deleteFlight: async ({
    params,
    store,
  }: {
    params: IParams;
    store: { user: IPayload };
  }) => flightServices.deleteFlight(params.uuid, store.user),
};

export default flightController;
