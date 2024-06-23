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
    childIcon: (isEnabled: boolean) =>
      isEnabled ? <div>Icon Enabled</div> : <div>Icon Disabled</div>, // Simplified for testing
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { getByText } = render(<LoadableCardButton {...defaultProps} />);
    expect(getByText(/Icon/)).toBeInTheDocument();
  });

  it("renders loading state initially", () => {
    const { getByRole } = render(<LoadableCardButton {...defaultProps} />);
    expect(getByRole("progressbar")).toBeInTheDocument();
  });

  it("calls checkEnabledFn on mount with correct arguments", () => {
    render(<LoadableCardButton {...defaultProps} />);
    expect(mockCheckEnabledFn).toHaveBeenCalledWith("movie", "123");
    expect(mockCheckEnabledFn).toHaveBeenCalledTimes(1);
  });

  it("changes IconButton opacity during loading", async () => {
    const { getByRole } = render(<LoadableCardButton {...defaultProps} />);
    fireEvent.click(getByRole("button"));
    await waitFor(() => {
      expect(getByRole("progressbar")).toHaveStyle({ opacity: 1 });
      expect(getByRole("button")).toHaveStyle({ opacity: 0 });
    });
  });

  it("properly cleans up on unmount", () => {
    const { unmount } = render(<LoadableCardButton {...defaultProps} />);
    unmount();
    expect(mockCheckEnabledFn).toHaveBeenCalledTimes(1);
    expect(mockDisableFn).not.toHaveBeenCalled();
    expect(mockEnableFn).not.toHaveBeenCalled();
  });
});
