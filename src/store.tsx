import React, { createContext, FC, Reducer, ReducerAction, useContext, useEffect, useReducer } from "react";
import { Product } from "./types";

type StoreProviderProps = {
  children: React.ReactNode
}

type StoreState = {
  cart: Product[],
  total: number,
  addToCart: (product: Product) => void,
  removeFromCart: (product: Product) => void
}

enum ActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  INIT_CARD = "INIT_CARD"
}

const initialState: StoreState = {
  cart: [],
  total: 0,
  addToCart: (product: Product) => { },
  removeFromCart: (product: Product) => { },
}

type StoreAction =
  | { type: ActionTypes.ADD_TO_CART; payload: Product }
  | { type: ActionTypes.REMOVE_FROM_CART; payload: Product }
  | { type: ActionTypes.INIT_CARD; payload: Product[] }



const StoreContext = createContext<StoreState>(initialState);

export const useStoreContext = () => useContext<StoreState>(StoreContext)

const storeReducer: Reducer<StoreState, StoreAction> = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
        total: state.total + payload.price
      }
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(({ id }) => id !== payload.id),
        total: state.total - payload.price
      }

    case ActionTypes.INIT_CARD:
      return { ...state, cart: payload, total: payload.reduce((sum, { price }) => sum + price, 0) }

    default:
      return state;;
  }
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  const addToCart = (product: Product) => {
    dispatch({ type: ActionTypes.ADD_TO_CART, payload: product })
  }

  const removeFromCart = (product: Product) => {
    dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: product })
  }

  useEffect(() => {
    const cart = localStorage.getItem("cart");

    if (cart) {
      dispatch({ type: ActionTypes.INIT_CARD, payload: JSON.parse(cart) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart])



  return (
    <StoreContext.Provider value={{ ...state, addToCart, removeFromCart }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider;