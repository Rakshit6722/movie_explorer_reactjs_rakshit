import React from "react";
import AuthTemplate from "../components/common/AuthTemplate";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([])
const initialState = {
    loading: { movie: { loading: false } },
}

const mockDispatch = jest.fn()
const mockNavigate = jest.fn()

const renderComponent = () => {
    return (
        render(
            <Provider store={mockStore(initialState)}>
                <MemoryRouter>
                    <AuthTemplate type={"login"} navigate={mockNavigate} dispatch={mockDispatch} />
                </MemoryRouter>
            </Provider>
        )
    )
}

describe("AuthTemplate", () => {
    test("render correctly", () => {
        renderComponent()
    })
})