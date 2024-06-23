import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadableCardButton from "../LoadableCardButton";
import { MediaType } from "@/utils/constants";

describe("LoadableCardButton", () => {
  const mockCheckEnabledFn = jest.fn();
  const mockDisableFn = jest.fn();
  const mockEnableFn = jest.fn();
  const defaultProps = {
    mediaType: MediaType.MOVIE,
    mediaId: "123",
    checkEnabledFn: mockCheckEnabledFn,
    disableFn: mockDisableFn,
    enableFn: mockEnableFn,
    loadingText: "Loading...",
    enabledText: "Enabled",
    disabledText: "Disabled",
    childIcon: <span>Icon</span>, // Simplified for testing
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    const { getByText } = render(<LoadableCardButton {...defaultProps} />);
    expect(getByText("Icon")).toBeInTheDocument();
  });
});
