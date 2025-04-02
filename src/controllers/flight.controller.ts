import flightServices from "@/services/flight.service";
import { SelectFlight } from "@/types/flight";
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

  filterasiFlight: async ({
    query,
  }: {
    query: {
      airlineName?: string;
      minPrice?: boolean;
      maxPrice?: boolean;
      departureCity?: string;
      destinationCity?: string;
    };
  }) => {
    const { airlineName, minPrice, maxPrice, departureCity, destinationCity } =
      query;
    return flightServices.filterasiFlight(
      airlineName || "",
      minPrice,
      maxPrice,
      departureCity,
      destinationCity
    );
  },

  createFlight: async ({
    body,
    store,
  }: {
    body: SelectFlight;
    store: { user: IPayload };
  }) => flightServices.createFlight(body, store.user),

  updateFlight: async ({
    params,
    body,
    store,
  }: {
    params: IParams;
    body: SelectFlight;
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
