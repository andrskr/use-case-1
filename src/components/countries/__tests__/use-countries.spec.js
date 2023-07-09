import { render, waitFor } from "@testing-library/react";

import * as countryAPI from "../../../common/api/country";
import { useCountries } from "../use-countries";

// Mock countries data
const mockCountries = [
  { name: { common: "United States" }, population: 331_000_000 },
  { name: { common: "Germany" }, population: 83_000_000 },
  { name: { common: "France" }, population: 67_000_000 },
  { name: { common: "Estonia" }, population: 1_300_000 },
  { name: { common: "Spain" }, population: 47_000_000 },
];

// Mock getAll function from countryAPI
jest.mock("../../../common/api/country");

// Create a test component that will call our hook
const HookTestComponent = ({ filters }) => {
  const hookResult = useCountries(filters);
  return (
    <div>
      {hookResult.countries.map((country, i) => (
        <div key={i}>{country.name.common}</div>
      ))}
    </div>
  );
};

describe("useCountries hook", () => {
  beforeEach(() => {
    countryAPI.getAll.mockResolvedValue(mockCountries);
  });

  it("fetches and displays countries", async () => {
    const { findAllByText } = render(
      <HookTestComponent
        filters={{ query: "", populationLimit: Infinity, sortOrder: "ascend" }}
      />
    );

    await waitFor(() => expect(countryAPI.getAll).toHaveBeenCalledTimes(1));

    // check if all the country names are in the document
    const countryNames = await findAllByText(/.+/);
    expect(countryNames).toHaveLength(mockCountries.length);
  });

  it("filters countries by name", async () => {
    const { findByText } = render(
      <HookTestComponent
        filters={{
          query: "st",
          populationLimit: Infinity,
          sortOrder: "ascend",
        }}
      />
    );

    // only 'Estonia' matches the filter 'st', so it should be the only country in the document
    expect(await findByText("Estonia")).toBeInTheDocument();
  });

  it("filters countries by population", async () => {
    const { findByText, queryByText } = render(
      <HookTestComponent
        filters={{ query: "", populationLimit: 10, sortOrder: "ascend" }}
      />
    );

    // only 'Estonia' has a population less than 10 million, so it should be the only country in the document
    expect(await findByText("Estonia")).toBeInTheDocument();

    // all other countries should not be in the document
    expect(queryByText("United States")).not.toBeInTheDocument();
    expect(queryByText("Germany")).not.toBeInTheDocument();
    expect(queryByText("France")).not.toBeInTheDocument();
    expect(queryByText("Spain")).not.toBeInTheDocument();
  });

  it("sorts countries by name", async () => {
    const { findAllByText } = render(
      <HookTestComponent
        filters={{ query: "", populationLimit: Infinity, sortOrder: "descend" }}
      />
    );

    // check if the country names are in the correct order
    const countryNames = await findAllByText(/.+/);
    expect(countryNames[0]).toHaveTextContent("United States");
    expect(countryNames[1]).toHaveTextContent("Spain");
    expect(countryNames[2]).toHaveTextContent("Germany");
    expect(countryNames[3]).toHaveTextContent("France");
    expect(countryNames[4]).toHaveTextContent("Estonia");
  });
});
