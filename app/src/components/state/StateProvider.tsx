import React, {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { getCityNames } from "../loadGenerator/LoadGenerator";
import { LoadData } from "../../core/load.model";
import { dateFormatterShort, isFirstDayOfMonth } from "../../core/helpers";

const DAILY_COST = 26.67;
const MONTHLY_COST = 4994;
const MILES_PER_DAY = 550;
const MILES_PER_GALLON = 6.5;
const FUEL_COST_PER_GALLON = 4.05;
const STARTING_WALLET_FUNDS = 7500;

const cityNames = getCityNames();

export interface Transaction {
  date: string;
  type: string;
  amount: number;
}

export interface BookedLoad extends LoadData {
  bookedDayIncrement: number;
  lane: string;
  daysUntilPayment: number;
  status: string;
}

const TRUCK_PAYMENT_DEFAULT = 1500.0;
const TRAILER_PAYMENT_DEFAULT = 738.0;
const AUTO_INSURANCE_DEFAULT = 1476.0;
const CARGO_INSURANCE_DEFAULT = 400.0;
const HEALTH_INSURANCE_DEFAULT = 250.0;
const PERMITS_DEFAULT = 200.0;
const EMERGENCY_FUND_DEFAULT = 700.0;
const DISPATCH_DEFAULT = 430.0;
const FOOD_AND_LODGING_DEFAULT = 500.0;
const OTHER_DEFAULT = 300.0;

export class TruckerData {
  constructor(
    public truckPayment: number = TRUCK_PAYMENT_DEFAULT,
    public trailerPayment: number = TRAILER_PAYMENT_DEFAULT,
    public autoInsurance: number = AUTO_INSURANCE_DEFAULT,
    public cargoInsurance: number = CARGO_INSURANCE_DEFAULT,
    public healthInsurance: number = HEALTH_INSURANCE_DEFAULT,
    public permits: number = PERMITS_DEFAULT,
    public emergencyFund: number = EMERGENCY_FUND_DEFAULT,
    public dispatch: number = DISPATCH_DEFAULT,
    public foodAndLodging: number = FOOD_AND_LODGING_DEFAULT,
    public other: number = OTHER_DEFAULT
  ) { }

  getMonthlyExpenses(): number {
    return (
      this.truckPayment +
      this.trailerPayment +
      this.autoInsurance +
      this.cargoInsurance +
      this.healthInsurance +
      this.permits +
      this.emergencyFund +
      this.dispatch
    );
  }

  getDailyExpenses(): number {
    return (this.foodAndLodging + this.other) / 30;
  }
}

const defaultContextState: {
  walletFunds: number;
  netProfit: number;
  days: number;
  currentLoad: LoadData | null;
  budgetSum: number;
  location: string;
  milesDriven: number;
  daysRemainingInTrip: number;
  transactionHistory: Transaction[];
  loadHistory: BookedLoad[];
  truckerDetails: TruckerData;
  fastForwarding: boolean;
} = {
  walletFunds: STARTING_WALLET_FUNDS,
  netProfit: 0,
  days: 0,
  currentLoad: null,
  daysRemainingInTrip: 0,
  budgetSum: 0,
  location: cityNames[0],
  milesDriven: 0,
  transactionHistory: [],
  loadHistory: [],
  truckerDetails: new TruckerData(),
  fastForwarding: false,
};

const defaultConstants = {
  dailyExpenses: DAILY_COST,
  monthyExpenses: MONTHLY_COST,
  milesPerDay: MILES_PER_DAY,
};

const GameContext = createContext({
  state: {
    ...defaultContextState,
  },
  constants: {
    ...defaultConstants,
  },
  endCurrentDay: () => { },
  chooseLoad: (chosenLoad: LoadData) => { },
  fastForwardToLoadDestination: () => { },
  updateTruckerDetails: (truckerDetails: TruckerData) => { },
});

export type GameContextType = typeof GameContext extends React.Context<infer U>
  ? U
  : never;

export const useGameContext = () => {
  return useContext(GameContext);
};

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({
    ...defaultContextState,
  });

  const [constants, setConstant] = useState({
    ...defaultConstants,
  });

  const endCurrentDay = useCallback(() => {
    setState((prevState) => {
      let deliverLoad = false;
      if (prevState.currentLoad && prevState.daysRemainingInTrip === 0) {
        deliverLoad = true;
      }

      let fastForwarding = prevState.fastForwarding;
      if (deliverLoad && prevState.fastForwarding) {
        fastForwarding = false;
      }

      let payBills = false;
      if (isFirstDayOfMonth(prevState.days + 1)) {
        payBills = true;
      }

      let milesDriven = 0;
      if (prevState.currentLoad) {
        milesDriven =
          prevState.daysRemainingInTrip > 0
            ? MILES_PER_DAY
            : (prevState.currentLoad.distance +
              prevState.currentLoad.deadhead) %
            MILES_PER_DAY;
      }

      const walletUpdate = updateWallet(
        payBills,
        constants.dailyExpenses,
        constants.monthyExpenses,
        prevState.walletFunds,
        prevState.days
      );
      const { fuelCost, fuelTransaction } = dailyFuelCost(
        milesDriven,
        prevState.days
      );

      let funds = walletUpdate.funds;
      const transactions = walletUpdate.transactions;

      const loadHistory = prevState.loadHistory;
      for (const load in loadHistory) {
        if (loadHistory[load].status === "Booked") {
          loadHistory[load].daysUntilPayment -= 1;
          if (loadHistory[load].daysUntilPayment === 0) {
            loadHistory[load].status = "Paid";
            funds += loadHistory[load].rate;
            transactions.push(
              transaction(
                loadHistory[load].rate,
                prevState.days,
                "Load Payment"
              )
            );
          }
        }
      }

      const transactionHistory = [
        ...prevState.transactionHistory,
        ...transactions,
      ];
      if (fuelTransaction) {
        transactionHistory.push(fuelTransaction);
      }

      return {
        ...prevState,
        days: prevState.days + 1,
        currentLoad: deliverLoad ? null : prevState.currentLoad,
        location: deliverLoad
          ? prevState.currentLoad!.destination
          : prevState.location,
        daysRemainingInTrip:
          prevState.daysRemainingInTrip > 0
            ? prevState.daysRemainingInTrip - 1
            : 0,
        transactionHistory,
        fastForwarding,
        walletFunds: funds - fuelCost,
      };
    });
  }, [
    state.currentLoad,
    state.daysRemainingInTrip,
    state.days,
    constants.dailyExpenses,
    constants.monthyExpenses,
  ]);

  useEffect(() => {
    if (state.fastForwarding) {
      setTimeout(() => {
        endCurrentDay();
      }, 300);
    }
  }, [state.fastForwarding, state.daysRemainingInTrip]);

  const fastForwardToLoadDestination = useCallback(() => {
    setState((prevState) => {
      return {
        ...prevState,
        fastForwarding: true,
      };
    });
  }, [
    state.currentLoad,
    state.daysRemainingInTrip,
    state.days,
    constants.dailyExpenses,
    constants.monthyExpenses,
    state.walletFunds,
    endCurrentDay,
  ]);

  const chooseLoad = useCallback(
    (chosenLoad: LoadData) => {
      setState((prevState) => ({
        ...prevState,
        currentLoad: chosenLoad,
        daysRemainingInTrip: Math.ceil(
          (chosenLoad.distance + chosenLoad.deadhead) / constants.milesPerDay
        ),
        loadHistory: [
          ...prevState.loadHistory,
          logBookedLoad(chosenLoad, prevState.days),
        ],
      }));
    },
    [constants.milesPerDay]
  );

  const updateTruckerDetails = useCallback((truckerDetailsTmp: TruckerData) => {
    setState((prevState) => ({
      ...prevState,
      truckerDetails: truckerDetailsTmp,
    }));
    setConstant((prevState) => ({
      ...prevState,
      monthyExpenses: truckerDetailsTmp.getMonthlyExpenses(),
      dailyExpenses: truckerDetailsTmp.getDailyExpenses(),
    }));
  }, []);

  const contextValue = {
    chooseLoad,
    constants,
    endCurrentDay,
    fastForwardToLoadDestination,
    updateTruckerDetails,
    state,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

function logBookedLoad(load: LoadData, day: number): BookedLoad {
  return {
    ...load,
    rate: load.is_factorable ? load.rate * 0.95 : load.rate,
    bookedDayIncrement: day,
    lane: `${load.origin} -> ${load.destination}`,
    daysUntilPayment: load.is_factorable ? getDaysToArrival(load) : Math.floor(Math.random() * (40 - 20 + 1)) + 20,
    status: "Booked",
  };
}

interface UpdateWalletOutput {
  funds: number;
  transactions: Transaction[];
}

function transaction(
  amount: number,
  daysFromStart: number,
  type: string
): Transaction {
  return {
    amount,
    date: dateFormatterShort(daysFromStart),
    type,
  };
}

function updateWallet(
  payBills: boolean,
  dailyExpenses: number,
  monthyExpenses: number,
  walletFunds: number,
  daysFromStart: number
): UpdateWalletOutput {
  const transactions: Transaction[] = [];
  if (!payBills) {
    transactions.push(
      transaction(-dailyExpenses, daysFromStart, "Daily Expenses")
    );
    return {
      funds: walletFunds - dailyExpenses,
      transactions,
    };
  }
  transactions.push(
    transaction(-dailyExpenses, daysFromStart, "Daily Expenses")
  );
  transactions.push(
    transaction(-monthyExpenses, daysFromStart, "Monthly Expenses")
  );
  return {
    funds: walletFunds - dailyExpenses - monthyExpenses,
    transactions,
  };
}

function dailyFuelCost(
  travelDistance: number,
  daysFromStart: number
): { fuelCost: number; fuelTransaction?: Transaction } {
  const fuelCost = (travelDistance / MILES_PER_GALLON) * FUEL_COST_PER_GALLON;
  return {
    fuelCost,
    fuelTransaction: fuelCost
      ? transaction(-fuelCost, daysFromStart, "Fuel")
      : undefined,
  };
}

function getDaysToArrival(load: LoadData): number {
  return Math.ceil((load.distance + load.deadhead) / MILES_PER_DAY);
}