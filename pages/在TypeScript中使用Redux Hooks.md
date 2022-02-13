type:: [[Note]],
category:: [[Web]]，
tag:: [[React]], [[Redux]],
language:: [[TypeScript]],

- Setting up the store, actions and reducers 
  ```Typescript
  # actions, reducers and dispatcher
  
  import {Action, Reducer} from "redux";
  
  export interface InitialState {
      name: string;
      address: string;
  }
  
  export const initialState: InitialState = {
      name: '',
      address: '',
  };
  
  export interface DispatchAction extends Action {
      payload: Partial<InitialState>;
  }
  
  export interface DispatchAction extends Action<ActionType> {
      payload: Partial<InitialState>;
  }
  
  export enum ActionType {
      UpdateName,
      UpdateAddress,
      DeleteName,
      DeleteAddress,
  }
  
  export const rootReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
      if (action.type === ActionType.UpdateName) {
          return {...state, name: action.payload.name || ''};
      } else if (action.type === ActionType.DeleteName) {
          return {...state, name: ''};
      } else if (action.type === ActionType.DeleteAddress) {
          return {...state, address: ''};
      } else if (action.type === ActionType.UpdateAddress) {
          return {...state, name: action.payload.name || ''};
      } else return state;
  };
  
  export class RootDispatcher {
      
      private readonly dispatch: Dispatch<DispatchAction>;
      
      constructor(dispatch: Dispatch<DispatchAction>){
          this.dispatch = dispatch; 
      }
  
      updateName = (name: string) => this.dispatch({type: ActionType.UpdateName, payload: {name}});
      
      updateAddress = (address: string) => this.dispatch({type: ActionType.UpdateAddress, payload: {address}});
      
      deleteName = () => this.dispatch({type: ActionType.DeleteName, payload: {}});
      
      deleteAddress = () => this.dispatch({type: ActionType.DeleteAddress, payload: {}})
  }
  ```
- Using in Components via Hooks 
  ```typescript
  import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
  import { Button, Form, Input } from "antd";
  import { useDispatch, useSelector } from "react-redux";
  import { InitialState, RootDispatcher } from "../store/root-reducer";
  
  interface Props {
  }
  
  interface StateProps {
    name: string;
    address: string;
  }
  
  const ReduxHooksComponent = (props: Props) => {
    const { name, address } = useSelector<InitialState, StateProps>((
      state: InitialState,
    ) => ({
      name: state.name,
      address: state.address,
    }));
  
    const dispatch = useDispatch();
    const rootDispatcher = new RootDispatcher(dispatch);
  
    return (
      <Form layout="inline">
        <Form.Item>
          <Input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              rootDispatcher.updateName(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              rootDispatcher.updateAddress(e.target.value);
            }}
          />
          <Button htmlType="submit" type="primary">Submit</Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default ReduxHooksComponent;
  ```
- > [React-Redux Hooks With Typescript In 2022](https://codersera.com/blog/react-redux-hooks-with-typescript/)
  [Hook 简介](https://zh-hans.reactjs.org/docs/hooks-intro.html)
  [Redux Hooks](https://react-redux.js.org/api/hooks)